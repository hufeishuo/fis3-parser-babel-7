## fis3-parser-babel-7

基于fis3，利用babel7将项目中代码转成es2015的写法. 


## 安装

``` shell
npm install -g fis3-parser-babel-7
```

## 用法

在`okay-conf.js`/`fis-conf.js`中添加如下配置

``` js
fis.match('/**.es6', {
    parser: fis.plugin('babel-7', {
        targets: ['defaults', 'chrome >= 49', 'ie > 8', 'edge > 11', 'safari > 9', 'not op_mini all'],
        // 规则参考https://github.com/browserslist/browserslist
        debug: false, // Boolean 是否开启preset-env的调试模式，会输出针对targets做的一些配置
        sourceMap: false, //可选值有三个 false, 'inline', 'both' 
        presets: [], // Array, 遵循@babel/core 中 option的写法
        plugins: [], // Array, 遵循@babel/core 中 option的写法
    })
})
```
