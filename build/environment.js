'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var PATH = _path2['default'].join(__dirname, '/../.env');

_dotenv2['default'].config({
  path: PATH
});

_dotenv2['default'].load();