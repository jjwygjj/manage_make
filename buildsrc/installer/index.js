'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = undefined;

var fetch = exports.fetch = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(incs) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(incs.length === 0)) {
              _context.next = 3;
              break;
            }

            console.log('Makefile 不包含include');
            return _context.abrupt('return');

          case 3:
            console.log('正在更新.....');
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 7;

            _loop = function _loop() {
              var inc = _step.value;

              var user = inc.split(' ')[1].split('/')[0];
              var file = inc.split(' ')[1].split('/')[1];
              var options = {
                url: 'https://raw.githubusercontent.com/' + user + '/make/master/' + file,
                headers: {
                  'User-Agent': 'request'
                }
              };
              function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                  makedir('/usr/local/include/' + user).then(function () {
                    _fs2.default.writeFileSync('/usr/local/include/' + inc.split(' ')[1], body);
                    console.log('\u66F4\u65B0\u5B8C\u6210\uFF1A' + file);
                  });
                }
              }
              (0, _request2.default)(options, callback);
            };

            for (_iterator = incs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](7);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 16:
            _context.prev = 16;
            _context.prev = 17;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 19:
            _context.prev = 19;

            if (!_didIteratorError) {
              _context.next = 22;
              break;
            }

            throw _iteratorError;

          case 22:
            return _context.finish(19);

          case 23:
            return _context.finish(16);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 12, 16, 24], [17,, 19, 23]]);
  }));

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lib = require('../lib');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function makedir(dir) {
  return new Promise(function (resolve, reject) {
    (0, _lib.pass)('mkdir', dir).then(function () {
      resolve();
    });
  });
}