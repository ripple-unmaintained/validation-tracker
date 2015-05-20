'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

require('pg').native;

var DATABASE_URL = process.env['VALIDATION_TRACKER_POSTGRES_URL'];

console.log('DATABASE_URL', DATABASE_URL);

exports['default'] = new _sequelize2['default'](DATABASE_URL, {
  ssl: true,
  native: true
});
module.exports = exports['default'];