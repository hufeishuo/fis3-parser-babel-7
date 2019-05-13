


require.async(['koa-server:test/es2015'], function () {
    var p = Promise.resolve(1);
    p.then(function (d) {
      console.log(d);
    }).finally(function () {
      console.log('finally|n\n');
    });
    console.log('test script end!');
  });