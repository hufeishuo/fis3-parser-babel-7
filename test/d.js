"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.promise.finally");

require.async(['koa-server:test/es2015'], function () {
  var p = Promise.resolve(1);
  p.then(function (d) {
    console.log(d);
  }).finally(function () {
    console.log('finally|n\n');
  });
  console.log('test script end!');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInMuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImFzeW5jIiwicCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImQiLCJjb25zb2xlIiwibG9nIiwiZmluYWxseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsQ0FBQyx3QkFBRCxDQUFkLEVBQTBDLFlBQVk7QUFDbEQsTUFBSUMsQ0FBQyxHQUFHQyxPQUFPLENBQUNDLE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FBUjtBQUNBRixFQUFBQSxDQUFDLENBQUNHLElBQUYsQ0FBTyxVQUFVQyxDQUFWLEVBQWE7QUFDbEJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixDQUFaO0FBQ0QsR0FGRCxFQUVHRyxPQUZILENBRVcsWUFBWTtBQUNyQkYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWjtBQUNELEdBSkQ7QUFLQUQsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFDRCxDQVJIIiwic291cmNlc0NvbnRlbnQiOlsiXG5cblxucmVxdWlyZS5hc3luYyhbJ2tvYS1zZXJ2ZXI6dGVzdC9lczIwMTUnXSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwID0gUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIHAudGhlbihmdW5jdGlvbiAoZCkge1xuICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgfSkuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnZmluYWxseXxuXFxuJyk7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coJ3Rlc3Qgc2NyaXB0IGVuZCEnKTtcbiAgfSk7Il19