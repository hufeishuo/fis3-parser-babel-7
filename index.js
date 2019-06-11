const babel = require('@babel/core');
const t = require('@babel/types');
const {
	default: traverse
} = require("@babel/traverse");

const presetEnv = require("@babel/preset-env");
const transformRuntime = require("@babel/plugin-transform-runtime");


const config = {
	presets: [
		[
			presetEnv,
			{
				debug: false,
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
			transformRuntime,
			{
				corejs: 3,
				helpers: true,
				regenerator: true,
				useESModules: false
			}
		]
	],
	sourceMap: undefined,
	ast: true
};

/** 
 * options:{
 * 	sourceMap: false/'inline'/'both'
 * 	debug: false, Boolean
 * 	targets: [], Array
 * 	presets:
 *  plugins:
 * } 
 */
function mergeConf(options, file) {
	const {
		presets = [],
			plugins = [],
			sourceMap
	} = options;

	// 是否开启debug模式
	config.presets[0][1].debug = options.debug || false;

	// 浏览器兼容列表
	if (options.targets) {
		config.presets[0][1].targets = options.targets;
	}
	const conf = fis.util.extend({
			sourceFileName: file.basename // sourcemap filename
		},
		config, {
			sourceMap, // 是否开启sourceMap
			presets: config.presets.concat(presets),
			plugins: config.plugins.concat(plugins)
		}
	);
	
	return conf;
}

module.exports = function (content, file, options) {
	const conf = mergeConf(options, file);
	const result = babel.transformSync(content, conf);
	if (options.async) {
		requireAsync(result.ast); // 处理html,vm中的script脚本中的require
		return babel.transformFromAstSync(result.ast).code
	} else {
		return result.code;
	}
};




// 采用babel的 traverse 进行AST的遍历，并修改对应的 Node
function requireAsync(ast) {

	let requires = [];
	let ra = null;
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

						if (raArgs.type === 'StringLiteral') {
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