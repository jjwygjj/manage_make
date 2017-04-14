'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helper = undefined;

var helper = exports.helper = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(target) {
    var parse;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _parser2.default.parse();

          case 2:
            parse = _context.sent;

            if (!(parse.targets.length === 0)) {
              _context.next = 6;
              break;
            }

            console.log('请先更新!..');
            return _context.abrupt('return');

          case 6:
            _context.t0 = !!target;
            _context.next = _context.t0 === true ? 9 : 13;
            break;

          case 9:
            _context.next = 11;
            return single(target, parse);

          case 11:
            return _context.abrupt('return', _context.sent);

          case 13:
            _context.next = 15;
            return all(parse);

          case 15:
            return _context.abrupt('return', _context.sent);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function helper(_x) {
    return _ref.apply(this, arguments);
  };
}();

var all = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref3) {
    var targets = _ref3.targets,
        annotations = _ref3.annotations;
    var result, index;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = 'update:\n';
            index = -1;

            _ramda2.default.forEach(function (annotation) {
              result += targets[++index] + ':\t\t' + annotation.split('\n')[0] + '\n';
            }, annotations);
            console.log(result);
            return _context2.abrupt('return', Buffer.from(result));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function all(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var single = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(target, _ref5) {
    var targets = _ref5.targets,
        annotations = _ref5.annotations;
    var result, t, annotation;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            result = 'update:\n';
            t = _ramda2.default.indexOf(target, targets);
            annotation = annotations[t] || '\n';

            if (!(annotation === '\n')) {
              _context3.next = 6;
              break;
            }

            console.log('\u672A\u627E\u5230\u5408\u9002\u547D\u4EE4' + target + '\uFF0C\u8BF7\u7528help\u547D\u4EE4\u67E5\u770B');
            return _context3.abrupt('return');

          case 6:
            result += target + ':\n\n' + annotation;
            console.log(result);
            return _context3.abrupt('return', Buffer.from(result));

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function single(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }