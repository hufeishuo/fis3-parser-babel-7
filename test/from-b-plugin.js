"use strict";

require.async(['koa-server:test/es2015'], function () {
  require("core-js/modules/es.promise.finally");

  require("core-js/modules/es.promise");

  require("core-js/modules/es.object.to-string");

  var p = Promise.resolve(1);
  p.then(function (d) {
    console.log(d);
  }).finally(function () {
    console.log('finally|n\n');
  });
  console.log('test script end!');
});