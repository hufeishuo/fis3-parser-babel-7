const babel = require('@babel/core');
const t = require('@babel/types');
const { default: traverse } = require("@babel/traverse");

const extend = require('extend');

let requires = [];
let ra = null;
const config = {
	presets: [
		[
			'@babel/preset-env',
			{
				debug: true,
				useBuiltIns: false,
				targets: {
					// The % refers to the global coverage of users from browserslist
					browsers: ['defaults', 'chrome >= 49', 'ie > 8', 'edge > 11', 'safari > 9', 'not op_mini all']
				}
			}
		]
	],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: 3, // 默认值，可以不写
				helpers: true, // 默认，可以不写
				regenerator: true, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
				useESModules: false // 使用 es modules helpers, 减少 commonJS 语法代码
			}
		]
	],
	sourceMap: undefined,
	ast: true
};

module.exports = function (content, file, options) {
	const conf = mergeConf(options, file);
	const result = babel.transformSync(content, conf);
	if (file.isPartial) { // 处理html,vm中的script脚本
		requireAsync(result.ast); // 处理<script>中的require
		return babel.transformFromAstSync(result.ast).code
	} else {
		return result.code;
	}
};

function mergeConf({ presets = [], plugins = [], sourceMap }, file) {
	const conf = extend(
		{
			sourceFileName: file.basename
		},
		config,
		{
			sourceMap,
			presets: config.presets.concat(presets),
			plugins: config.plugins.concat(plugins)
		}
	);
	return conf;
}


function requireAsync(ast) {
	const collectRequire = {
		CallExpression: {
			exit(path) {
				if (path.get('callee').node.name === 'require') {
					requires.unshift(path);
				}
			}
		}
	};

	traverse(ast, {
		Program: {
			enter(path, state) {
				ra = null;
				requires = [];
			},
			exit(path, state) {
				path.traverse(collectRequire);

				if (requires.length > 0) { 

					// 检查是否已经存在require.async
					let hasRA = path.get('body').some((n) => {
						if (
							n.type === 'ExpressionStatement' &&
							n.node.expression.type === 'CallExpression' &&
							n.node.expression.callee &&
							n.node.expression.callee.type === 'MemberExpression' &&
							n.node.expression.callee.object.name === 'require' &&
							n.node.expression.callee.property.name === 'async'
						) {
							ra = n;
							return true;
						}
					});

					// 如果存在require.async， 则把收集到的require('xxx')，直接放到require.async中
					if (hasRA) {
						let raArgs = [],
							raCallback = null;
						// if (ra.node.expression.arguments[0].type === 'ArrayExpression') {
							raArgs = ra.node.expression.arguments[0];
							raCallback = ra.node.expression.arguments[1];

							if(raArgs.type === 'StringLiteral'){
								raArgs = ra.node.expression.arguments[0] = t.arrayExpression([raArgs]);
							}
						// }

						requires.reverse().forEach((n, i) => {
							let args = n.get('arguments');
							args && raArgs.elements.unshift(args[0].node);

							const varObj = path.scope.generateUidIdentifier('_require');
							raCallback.params.unshift(varObj);

							n.replaceWith(varObj);
						});

						const allPrevs = ra.getAllPrevSiblings();
						allPrevs.reverse().forEach((n) => {
							raCallback.body.body.unshift(n.node);
							n.remove();
						});
					} else {
						const rArgs = [],
							params = [];
						requires.forEach((n) => {
							let args = n.get('arguments');
							args && rArgs.push(args[0].node);

							const varObj = path.scope.generateUidIdentifier('_require');

							params.push(varObj);

							// TODO: if n is like to 'require('xxxx')', then should delete it
							n.replaceWith(varObj); // var xxx = require('xxxx');
						});

						// // create a new require.async(['x',...], function(x,...){});
						const newRa = t.expressionStatement(
							t.callExpression(t.memberExpression(t.identifier('require'), t.identifier('async')), [
								t.arrayExpression(rArgs),
								t.functionExpression(null, params, t.blockStatement(path.node.body))
							])
						);
						path.node.body = [newRa];
					}
				}
			}
		}
	});
}