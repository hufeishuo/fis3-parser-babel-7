"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

require.async(['/components/index.js'], function () {
  var p = _promise.default.resolve(1);

  p.then(function (d) {
    console.log(d);
  }).finally(function () {
    console.log('finally');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInMuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImFzeW5jIiwicCIsInJlc29sdmUiLCJ0aGVuIiwiZCIsImNvbnNvbGUiLCJsb2ciLCJmaW5hbGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsQ0FBQyxzQkFBRCxDQUFkLEVBQXdDLFlBQVU7QUFDaEQsTUFBTUMsQ0FBQyxHQUFHLGlCQUFRQyxPQUFSLENBQWdCLENBQWhCLENBQVY7O0FBQ0FELEVBQUFBLENBQUMsQ0FBQ0UsSUFBRixDQUFPLFVBQUFDLENBQUMsRUFBRTtBQUNOQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNILEdBRkQsRUFHQ0csT0FIRCxDQUdTLFlBQUk7QUFDVEYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksU0FBWjtBQUNILEdBTEQ7QUFNRCxDQVJEIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZS5hc3luYyhbJy9jb21wb25lbnRzL2luZGV4LmpzJ10sIGZ1bmN0aW9uKCl7XG4gIGNvbnN0IHAgPSBQcm9taXNlLnJlc29sdmUoMSk7XG4gIHAudGhlbihkPT57XG4gICAgICBjb25zb2xlLmxvZyhkKTtcbiAgfSlcbiAgLmZpbmFsbHkoKCk9PntcbiAgICAgIGNvbnNvbGUubG9nKCdmaW5hbGx5Jyk7XG4gIH0pO1xufSk7Il19