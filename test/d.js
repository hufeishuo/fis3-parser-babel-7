"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.promise.finally");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(g);

function g() {
  return _regenerator.default.wrap(function g$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          _context.next = 4;
          return 2;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var g1 = g();
g1.next();
g1.next();
var p = new Promise(function (resolve, reject) {
  var r = Math.random();

  if (r > 0.3) {
    resolve(r);
  } else {
    reject(r);
  }
});
p.then(function (d) {
  console.log("resolve: ".concat(d));
}, function (d) {
  console.log("reject: ".concat(d));
}).finally(function () {
  console.log('finally');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInMuanMiXSwibmFtZXMiOlsiZyIsImcxIiwibmV4dCIsInAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInIiLCJNYXRoIiwicmFuZG9tIiwidGhlbiIsImQiLCJjb25zb2xlIiwibG9nIiwiZmluYWxseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OzswQkFBVUEsQzs7QUFBVixTQUFVQSxDQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFLGlCQUFNLENBQU47O0FBREY7QUFBQTtBQUVFLGlCQUFNLENBQU47O0FBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS0EsSUFBSUMsRUFBRSxHQUFHRCxDQUFDLEVBQVY7QUFDQUMsRUFBRSxDQUFDQyxJQUFIO0FBQ0FELEVBQUUsQ0FBQ0MsSUFBSDtBQUVBLElBQUlDLENBQUMsR0FBRyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQW1CO0FBQ3JDLE1BQUlDLENBQUMsR0FBR0MsSUFBSSxDQUFDQyxNQUFMLEVBQVI7O0FBQ0EsTUFBR0YsQ0FBQyxHQUFHLEdBQVAsRUFBWTtBQUNWRixJQUFBQSxPQUFPLENBQUNFLENBQUQsQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMRCxJQUFBQSxNQUFNLENBQUNDLENBQUQsQ0FBTjtBQUNEO0FBQ0YsQ0FQTyxDQUFSO0FBU0FKLENBQUMsQ0FBQ08sSUFBRixDQUFPLFVBQUNDLENBQUQsRUFBSztBQUNWQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsb0JBQXdCRixDQUF4QjtBQUNELENBRkQsRUFFRyxVQUFDQSxDQUFELEVBQUs7QUFDTkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLG1CQUF1QkYsQ0FBdkI7QUFDRCxDQUpELEVBSUdHLE9BSkgsQ0FJVyxZQUFJO0FBQ2JGLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFNBQVo7QUFDRCxDQU5EIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gKmcoKXtcclxuICB5aWVsZCAxO1xyXG4gIHlpZWxkIDI7XHJcbn1cclxuXHJcbmxldCBnMSA9IGcoKTtcclxuZzEubmV4dCgpO1xyXG5nMS5uZXh0KCk7XHJcblxyXG5sZXQgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gIGlmKHIgPiAwLjMgKXtcclxuICAgIHJlc29sdmUocilcclxuICB9IGVsc2Uge1xyXG4gICAgcmVqZWN0KHIpO1xyXG4gIH1cclxufSk7XHJcblxyXG5wLnRoZW4oKGQpPT57XHJcbiAgY29uc29sZS5sb2coYHJlc29sdmU6ICR7ZH1gIClcclxufSwgKGQpPT57XHJcbiAgY29uc29sZS5sb2coYHJlamVjdDogJHtkfWAgKVxyXG59KS5maW5hbGx5KCgpPT57XHJcbiAgY29uc29sZS5sb2coJ2ZpbmFsbHknKTtcclxufSk7Il19