'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _validation_tracker = require('../validation_tracker');

var _validation_tracker2 = _interopRequireDefault(_validation_tracker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var HbaseValidationTracker = (function (_ValidationTracker) {
  function HbaseValidationTracker(rippledPubKey, hbaseClient) {
    _classCallCheck(this, HbaseValidationTracker);

    _get(Object.getPrototypeOf(HbaseValidationTracker.prototype), 'constructor', this).call(this, rippledPubKey);
    this.client = hbaseClient;
  }

  _inherits(HbaseValidationTracker, _ValidationTracker);

  _createClass(HbaseValidationTracker, [{
    key: 'onValidation',

    // @override
    value: function onValidation(entry) {
      var row = this.client.table(process.env.HBASE_TABLE)
      // Use "public_key|ledger_hash" as row name
      .row('' + entry.public_key + '|' + entry.hash);

      row.putAsync('validation:public_key', entry.public_key).then(row.putAsync('validation:hash', entry.hash)).then(row.putAsync('validation:datetime', (0, _moment2['default'])(new Date(entry.datetime)).format('YYYYMMDDHHmmss'))).then(console.log('saved validation in hbase')).error(function (err) {
        console.error('hbase put error', err);
      });
    }
  }]);

  return HbaseValidationTracker;
})(_validation_tracker2['default']);

exports['default'] = HbaseValidationTracker;
module.exports = exports['default'];