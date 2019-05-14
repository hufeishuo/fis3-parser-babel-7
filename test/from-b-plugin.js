"use strict";

require.async(["@babel/runtime-corejs3/core-js-stable/promise", "@babel/runtime-corejs3/helpers/interopRequireDefault", 'koa-server:test/es2015'], function (xx1, xx0, a) {
  var _interopRequireDefault = xx0;

  var _promise = _interopRequireDefault(xx1);

  var b = a;
  var a = 1;

  var p = _promise.default.resolve(1);

  p.then(function (d) {
    console.log(d);
  }).finally(function () {
    console.log('finally|n\n');
  });
  console.log('test script end!');
});