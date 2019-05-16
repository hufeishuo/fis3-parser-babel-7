const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

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
		return result.code;
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

	if(file.isPartial){
		const extra = require('../babel-plugin-stop-hosit/index.js');
		conf.presets.unshift({
			plugins: [ extra ]
		});
	}
	return conf;
}
