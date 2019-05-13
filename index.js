const babel = require('@babel/core');

const extend = require('extend');

const config = {
    presets: [["@babel/preset-env", {
        "debug": true,
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
            // The % refers to the global coverage of users from browserslist
            "browsers": ["defaults",
                "chrome >= 49",
                "ie > 8",
                "edge > 11",
                "safari > 9",
                "not op_mini all"]
        }
    }]],
    "plugins": [
        {visitor: {
            Identifier:{
                exit(path){
                    console.log(path.node.name);
                }
                
            }
                }},
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": false, // 默认值，可以不写
                "helpers": true, // 默认，可以不写
                "regenerator": false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
                "useESModules": false, // 使用 es modules helpers, 减少 commonJS 语法代码
            }
        ]

    ],
    "sourceMap": undefined

    , ast: false
};

module.exports = function (content, file, options) {
    const conf = mergeConf(options, file);
    return babel.transform(content, conf).code;
}

function mergeConf({ presets = [], plugins = [], sourceMap }, file) {
    return extend({
        sourceFileName: file.basename
    }, config, {
            sourceMap,
            presets: config.presets.concat(presets),
            plugins: config.plugins.concat(plugins)
        });
}

function babelPlugin(){
    return {
        visitor: {
            Identifier(path) {
                // enter(path) {
                    console.log(path.get('name'));
                    if (path.isIdentifier({ name: "require" })
                        && path.parent.type === 'MemberExpression'
                        && path.parent.property
                        && path.parent.property.name === 'async'
                    ) {
                        console.log(1);
            
                        const p = path.findParent((path) => path.isExpressionStatement());
                        const callEx = path.findParent((path) => path.isCallExpression());
                        const fn = callEx.get('arguments').pop();
                        let siblings; 
                        console.log( siblings = p.getAllPrevSiblings());
                        siblings.reverse().forEach(n=>{
                            fn.get('body').unshiftContainer(
                                'body', n.node); 
                                n.remove();
                        });
            
                    }
                // }
            }
          }
    }
}