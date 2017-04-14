'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lib = require('../lib');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);

    this.annotations = [];
    this.targets = [];
  }

  _createClass(Parser, [{
    key: 'parse',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var io, annotation;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _lib.getSources)();

              case 2:
                io = _context.sent;
                annotation = '';

                _ramda2.default.forEach(function (source, index) {
                  if (_this.isAnnotation(source)) annotation += source.substr(1) + '\n';
                  if (_this.isTarget(source)) {
                    _this.targets.push(source.split(':')[0]);
                    _this.annotations.push(annotation);
                    annotation = '';
                  }
                }, io.result);
                return _context.abrupt('return', {
                  annotations: this.annotations,
                  targets: this.targets
                });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function parse() {
        return _ref.apply(this, arguments);
      }

      return parse;
    }()
  }, {
    key: 'isAnnotation',
    value: function isAnnotation(data) {
      return data.indexOf('#') > -1;
    }
  }, {
    key: 'isTarget',
    value: function isTarget(data) {
      return data.indexOf(':') > -1 && data.indexOf('PHONY') == -1;
    }
  }]);

  return Parser;
}();

var parser = new Parser();
exports.default = parser;