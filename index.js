const babel = require('@babel/core');
console.log(
    'coo***77777',
    'boos'
);

const extend = require('extend');

const config = {
    presets: [["@babel/preset-env", {
        "debug": true,
        "useBuiltIns": "usage",
        "targets": {
            // The % refers to the global coverage of users from browserslist
            "browsers": ["defaults",
                "chrome > 49",
                "ie > 8", 
                "edge > 11",
                "safari > 9",
                "not op_mini all"]
        }
    }]],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ],
    "sourceMap": undefined

    , ast: false
};

module.exports = function (content, file, options) {
    // console.log(file.fullname);
    const conf = mergeConf(options);
    console.log(conf);
    return babel.transform(content, conf).code;
}

function mergeConf({ presets = [], plugins = [], sourceMap }) {
    return extend({}, config, {
        sourceMap,
        presets: config.presets.concat(presets),
        plugins: config.plugins.concat(plugins)
    });
}