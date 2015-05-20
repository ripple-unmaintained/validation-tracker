'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelsLedger = require('./models/ledger');

var _modelsLedger2 = _interopRequireDefault(_modelsLedger);

var _modelsNode = require('./models/node');

var _modelsNode2 = _interopRequireDefault(_modelsNode);

var _modelsValidation = require('./models/validation');

var _modelsValidation2 = _interopRequireDefault(_modelsValidation);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

_modelsValidation2['default'].belongsTo(_modelsLedger2['default']);
_modelsValidation2['default'].belongsTo(_modelsNode2['default']);

exports['default'] = {
  database: _database2['default'],
  models: {
    Node: _modelsNode2['default'],
    Ledger: _modelsLedger2['default'],
    Validation: _modelsValidation2['default']
  }
};
module.exports = exports['default'];