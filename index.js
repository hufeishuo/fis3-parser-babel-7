const babel = require('@babel/core');

const extend = require('extend');

let requires = [];
let ra = null;
const config = {
	presets: [
		{
			plugins: [
				
				{
					visitor: {
						'Program': {
							enter(path, state) {
								ra = null;
								requires = [];
							},
							exit(path, state) {
								// path.traverse({
								// 	'CallExpression': {
								// 		enter(path) {
								// 			if (path.get('callee').node.name === 'require') {
								// 				console.log(path.get('arguments')[0].node.value);
								// 				requires.push(path);
								// 			}
								// 	}
								// 	}
								// });
								// if (requires.length === 0) {
								// 	return false;
								// }
								
                                // const last = path.get('body').pop();
                                if(/login\.html/.test(state.filename)){
                                    const cur = new Date();
                                    require('fs').writeFileSync((cur.getMinutes() + '-' + cur.getSeconds()) + '.json', JSON.stringify(state.file.ast));
                                     
                                }
                                           

								// let hasRA = path.get('body').some((n) => {
								// 	if (
								// 		n.type === 'ExpressionStatement' &&
								// 		n.node.expression.type === 'CallExpression' &&
								// 		n.node.expression.callee &&
								// 		n.node.expression.callee.type === 'MemberExpression' &&
								// 		n.node.expression.callee.object.name === 'require' &&
								// 		n.node.expression.callee.property.name === 'async'
								// 	) {
								// 		ra = n;
										
								// 	}
                                // });
                                //const cur = new Date();
                                //require('fs').writeFileSync((cur.getMinutes() + '-' + cur.getSeconds()) + '.json', JSON.stringify(state.file.ast));
                                        
                                // if( false && hasRA){
                                //     let n = ra;

								// 		let raArgs = [],
                                //         raCallback = null;
                                //     if ( n.node.expression.arguments[0].type === 'ArrayExpression') {
                                //         raArgs = n.node.expression.arguments[0];
                                //         raCallback = n.node.expression.arguments[1];
                                        
                                //         requires.reverse().forEach((n, i) => {
                                //             let args = n.get('arguments');
                                //             args && raArgs.elements.unshift(args[0].node);
                                //             let varName = 'xx' + i;
                                //             console.log(varName);
                                //             const varObj = {
                                //                 type: 'Identifier',
                                //                 name: varName
                                //             };

                                //             raCallback.params.unshift(varObj);

                                //             n.replaceWith(varObj);
                                //         });

                                //         const box = ra.get('body');

                                //         const allPrevs = ra.getAllPrevSiblings();
                                //         const cur = new Date();
                                //         require('fs').writeFileSync((cur.getMinutes() + '-' + cur.getSeconds()) + '.json', JSON.stringify(state.file.ast));
                                //         allPrevs.reverse().forEach((n) => {
                                //             raCallback.body.body.unshift(n.node);
                                //             n.remove();
                                //         });
                                //     }

                                // }
							}
						}
					}
				}
			]
		},
		[
			'@babel/preset-env',
			{
				debug: true,
				useBuiltIns: false,
				// "corejs": 3,
				targets: {
					// The % refers to the global coverage of users from browserslist
					browsers: [ 'defaults', 'chrome >= 49', 'ie > 8', 'edge > 11', 'safari > 9', 'not op_mini all' ]
				}
			}
		]
	],
	plugins: [
		{
			visitor: {
				Identifier: {
					exit(path) {
						// console.log(`[${+new Date()}] plugin 1:  ${path.node.name}`);
					}
				}
			}
		},
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: 3, // 默认值，可以不写
				helpers: true, // 默认，可以不写
				regenerator: false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
				useESModules: false // 使用 es modules helpers, 减少 commonJS 语法代码
			}
		],
		{
			visitor: {
				Identifier: {
					exit(path) {
						// console.log(`[${+new Date()}] plugin 2:  ${path.node.name}`);
					}
				}
			}
		}
	],
	sourceMap: undefined,

	ast: false
};

module.exports = function(content, file, options) {
	const conf = mergeConf(options, file);
	return babel.transform(content, conf).code;
};

function mergeConf({ presets = [], plugins = [], sourceMap }, file) {
	return extend(
		{
			filename: file.subpath,
			sourceFileName: file.basename
		},
		config,
		{
			sourceMap,
			presets: config.presets.concat(presets),
			plugins: config.plugins.concat(plugins)
		}
	);
}
