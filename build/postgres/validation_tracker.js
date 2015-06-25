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

var _ = require('./');

var SqlValidationTracker = (function (_ValidationTracker) {
  function SqlValidationTracker() {
    _classCallCheck(this, SqlValidationTracker);

    _get(Object.getPrototypeOf(SqlValidationTracker.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(SqlValidationTracker, _ValidationTracker);

  _createClass(SqlValidationTracker, [{
    key: 'onValidation',
    value: function onValidation(validation) {
      var _this = this;

      var node, ledger, validation;

      return _.models.Node.findOrCreate({ where: {
          validation_public_key: validation.public_key
        } }).spread(function (_node, created) {
        node = _node;
        return _.models.Ledger.findOrCreate({ where: {
            ledger_hash: validation.hash
          } });
      }).spread(function (_ledger, created) {
        ledger = _ledger;
        return _.models.Validation.create({
          ledger_id: ledger.id,
          node_id: node.id,
          reporter_public_key: _this.rippledPubKey
        });
      }).then(function (_validation) {
        console.log('saved validation in postgres', _validation.toJSON());
      })['catch'](function (error) {
        console.log('PSQL Error', error);
      });
    }
  }]);

  return SqlValidationTracker;
})(_validation_tracker2['default']);

exports['default'] = SqlValidationTracker;
module.exports = exports['default'];