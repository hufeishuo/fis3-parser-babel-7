const babel = require('@babel/core');

const extend = require('extend');
const fs = require('fs');

const config = {
    presets: [["@babel/preset-env", {
        "debug": true,
        "useBuiltIns": "usage",
        // "corejs": 3,
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
        [
            "@babel/plugin-transform-runtime",
            {
                // "corejs": 3, // 默认值，可以不写
                // "helpers": true, // 默认，可以不写
                // "regenerator": false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
                // "useESModules": false, // 使用 es modules helpers, 减少 commonJS 语法代码
            }
        ]

    ],
    "sourceMap": "inline"

    , ast: true
};

const code = 'function a(){Promise.resolve(1);}';

const result = babel.transformFileSync('s.js', config);



fs.writeFile('d.js', result.code, ()=>{});

fs.writeFile('d.ast.json', JSON.stringify(result.ast), ()=>{});