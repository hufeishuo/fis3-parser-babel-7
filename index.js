const babel = require('@babel/core');
const { parse } = require("@babel/parser") ;
const t = require('@babel/types');
const { default: traverse } = require("@babel/traverse") ;
const fs = require('fs');
const path = require('path');

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
					browsers: [ 'defaults', 'chrome >= 49', 'ie > 8', 'edge > 11', 'safari > 9', 'not op_mini all' ]
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

const requireAsyncWrap = require('../babel-plugin-stop-hosit/index.js');

module.exports = function(content, file, options) {
	const conf = mergeConf(options, file);
	const result = babel.transformSync(content, conf);
	if (file.isPartial) {
		// const ast = parser.parse(result.code);
		// traverse.default(ast, requireAsyncWrap.visitor);
		// return babel.transformFromAstSync(ast).code;
		require('fs').writeFileSync(`result-ast-${file.basename}.json`, JSON.stringify(result.ast));
		// let ast = result.ast;
		requireAsync(result.ast);
		return babel.transformFromAstSync(result.ast).code
		// return result.code;
	} else {
		return result.code;
	}
};

function mergeConf({ presets = [], plugins = [], sourceMap }, file) {
	const conf = extend(
		{
			// filename: file.subpath,
			sourceFileName: file.basename
		},
		config,
		{
			sourceMap,
			presets: config.presets.concat(presets),
			plugins: config.plugins.concat(plugins)
		}
	);

	// if(file.isPartial){
	// 	const extra = require('../babel-plugin-stop-hosit/index.js');
	// 	conf.presets.unshift({
	// 		plugins: [ extra ]
	// 	});
	// }
	return conf;
}


function requireAsync(ast){
	const collectRequire = {
		CallExpression: {
			exit(path) {
				if (path.get('callee').node.name === 'require') {
					console.log(path.get('arguments')[0].node.value);
					requires.unshift(path);
				}
			}
		}
	};

	traverse(ast, {
		// visitor: {
			Program: {
				enter(path, state) {
					ra = null;
					requires = [];
				},
				exit(path, state) {
					// console.log(JSON.stringify(state.file.ast));
					path.traverse(collectRequire);
	
					if (requires.length > 0) {
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
	
						if (hasRA) {
							console.log('\n\n\n\n\nhasRa +++++++ ----\n\n\n\n\n');
							let n = ra;
							let raArgs = [],
								raCallback = null;
							if (ra.node.expression.arguments[0].type === 'ArrayExpression') {
								raArgs = ra.node.expression.arguments[0];
								raCallback = ra.node.expression.arguments[1];
							}
	
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
							// writeFile(generateFile('before')(), JSON.stringify(state.file.ast))
							// .then((d) => {
							// 	console.log(`write file's ast : ${state.filename} success\n`);
							// })
							// .finally(() => {
							// 	console.log(`[${new Date()}] write before ast error~`);
							// });
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
	
							// path.unshiftContainer('body', newRa);
	
							path.node.body = [ newRa ];
						}
	
						// writeFile(generateFile('after')(), JSON.stringify(ast))
						// 	.then((d) => {
						// 		console.log(`write file's ast : xxxxx.json success\n`);
						// 	})
						// 	.finally(() => {
						// 		console.log(`[${new Date()}] write after ast error~`);
						// 	});
					}
				}
			}
	});
}