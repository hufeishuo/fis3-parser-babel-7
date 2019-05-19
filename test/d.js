"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

require.async('test/es2015.js', function () {
  var p = _promise.default.resolve(1);

  p.then(function (d) {
    console.log(d);
  }).finally(function () {
    console.log('finally|n\n');
  });
  console.log('test script end!');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInMuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImFzeW5jIiwicCIsInJlc29sdmUiLCJ0aGVuIiwiZCIsImNvbnNvbGUiLCJsb2ciLCJmaW5hbGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsZ0JBQWQsRUFBZ0MsWUFBSTtBQUNsQyxNQUFNQyxDQUFDLEdBQUcsaUJBQVFDLE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FBVjs7QUFDQUQsRUFBQUEsQ0FBQyxDQUFDRSxJQUFGLENBQU8sVUFBQUMsQ0FBQyxFQUFFO0FBQ05DLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixDQUFaO0FBQ0gsR0FGRCxFQUdDRyxPQUhELENBR1MsWUFBSTtBQUNURixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaO0FBQ0gsR0FMRDtBQU1BRCxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUNELENBVEQiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlLmFzeW5jKCd0ZXN0L2VzMjAxNS5qcycsICgpPT57XHJcbiAgY29uc3QgcCA9IFByb21pc2UucmVzb2x2ZSgxKTtcclxuICBwLnRoZW4oZD0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhkKTtcclxuICB9KVxyXG4gIC5maW5hbGx5KCgpPT57XHJcbiAgICAgIGNvbnNvbGUubG9nKCdmaW5hbGx5fG5cXG4nKTtcclxuICB9KVxyXG4gIGNvbnNvbGUubG9nKCd0ZXN0IHNjcmlwdCBlbmQhJyk7XHJcbn0pIl19