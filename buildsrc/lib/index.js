'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSources = exports.getIncludes = undefined;

var getIncludes = exports.getIncludes = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var file;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = _path2.default.normalize(__dirname + '/../../Makefile');
            _context.next = 3;
            return readline(file);

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getIncludes() {
    return _ref.apply(this, arguments);
  };
}();

var getSources = exports.getSources = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var io, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, inc, readl, source;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getIncludes();

          case 2:
            io = _context2.sent;
            result = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 7;
            _iterator = io.result[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 19;
              break;
            }

            inc = _step.value;
            _context2.next = 13;
            return readline('/usr/local/include/' + inc.split(' ')[1]);

          case 13:
            readl = _context2.sent;
            source = fileIsExist('/usr/local/include/' + inc.split(' ')[1]) ? readl.result : [];

            result = result.concat(source);

          case 16:
            _iteratorNormalCompletion = true;
            _context2.next = 9;
            break;

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2['catch'](7);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 25:
            _context2.prev = 25;
            _context2.prev = 26;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 28:
            _context2.prev = 28;

            if (!_didIteratorError) {
              _context2.next = 31;
              break;
            }

            throw _iteratorError;

          case 31:
            return _context2.finish(28);

          case 32:
            return _context2.finish(25);

          case 33:
            return _context2.abrupt('return', new IO(result, ''));

          case 34:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[7, 21, 25, 33], [26,, 28, 32]]);
  }));

  return function getSources() {
    return _ref2.apply(this, arguments);
  };
}();

exports.readline = readline;
exports.pass = pass;

var _readline2 = require('readline');

var _readline3 = _interopRequireDefault(_readline2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function readline(file) {
  return new Promise(function (resolve, reject) {
    var result = [];
    var rl = _readline3.default.createInterface({
      input: _fs2.default.createReadStream(file)
    });

    rl.on('line', function (line) {
      result.push(line);
    });
    rl.on('close', function () {
      resolve(new IO(result, ''));
    });
  }).then();
}
function pass(commander, value) {
  return new Promise(function (resolve, reject) {
    var ls = (0, _child_process.spawn)(commander, [value]);

    ls.stdout.on('data', function (data) {
      console.log('' + data);
    });

    ls.stderr.on('data', function (data) {

      switch (isMkdirOrStop(data)) {
        case 'mkdir':
          return resolve();
          break;
        case 'Stop':
          console.log('\u672A\u627E\u5230\u5408\u9002\u547D\u4EE4' + value + '\uFF0C\u8BF7\u7528help\u547D\u4EE4\u67E5\u770B!');
          return;
          break;
        default:
          console.log('' + data);
      }
    });

    ls.on('close', function (code) {
      resolve();
    });
  });
}

function fileIsExist(path) {
  return _fs2.default.existsSync(path);
}
function isMkdirOrStop(data) {
  return data.toString().split(':')[0] === 'mkdir' ? 'mkdir' : data.toString().indexOf('Stop') > -1 ? 'Stop' : null;
}

var IO = function IO(result, error) {
  _classCallCheck(this, IO);

  this.result = result;
  this.error = error;
};