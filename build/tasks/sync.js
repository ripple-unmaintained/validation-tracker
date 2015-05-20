'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sqlDatabase = require('../sql/database');

var _sqlDatabase2 = _interopRequireDefault(_sqlDatabase);

require(__dirname + '/../environment');

console.log(_sqlDatabase2['default']);

_sqlDatabase2['default'].sync().then(function (result) {
  console.log('migration success!');
});