'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _validation_tracker = require('../validation_tracker');

var _validation_tracker2 = _interopRequireDefault(_validation_tracker);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var HttpValidationTracker = (function (_ValidationTracker) {
  function HttpValidationTracker(rippledPubKey, url) {
    _classCallCheck(this, HttpValidationTracker);

    _get(Object.getPrototypeOf(HttpValidationTracker.prototype), 'constructor', this).call(this, rippledPubKey);
    this.url = url;
  }

  _inherits(HttpValidationTracker, _ValidationTracker);

  _createClass(HttpValidationTracker, [{
    key: 'onValidation',

    // @override
    value: function onValidation(validation) {
      _superagent2['default'].post(this.url).send({
        validation_public_key: validation.public_key,
        ledger_hash: validation.hash,
        reporter_public_key: this.rippledPubKey
      }).end(function (err, res) {
        if (err) {
          console.log('HTTP Service Error', err.message, res.text);
        } else {
          console.log('Submitted validation to http service:', JSON.stringify(validation));
        }
      });
    }
  }]);

  return HttpValidationTracker;
})(_validation_tracker2['default']);

exports['default'] = HttpValidationTracker;
module.exports = exports['default'];