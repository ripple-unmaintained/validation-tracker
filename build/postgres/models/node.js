'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

exports['default'] = _database2['default'].define('Node', {
  validation_public_key: _sequelize2['default'].STRING }, {
  timestamps: true,
  underscored: true,
  tableName: 'nodes'
});
module.exports = exports['default'];