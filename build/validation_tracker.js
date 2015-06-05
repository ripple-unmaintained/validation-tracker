'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _child_process = require('child_process');

var _betterConsole = require('better-console');

var _betterConsole2 = _interopRequireDefault(_betterConsole);

var _validation_log_entry = require('./validation_log_entry');

var _validation_log_entry2 = _interopRequireDefault(_validation_log_entry);

var RippledLogMonitor = (function () {
  function RippledLogMonitor() {
    _classCallCheck(this, RippledLogMonitor);
  }

  _createClass(RippledLogMonitor, [{
    key: 'monitorFile',
    value: function monitorFile(filename) {
      var _this = this;

      _betterConsole2['default'].log('Path: ', filename);
      var cmd = (0, _child_process.spawn)('tail', ['-F', filename]);
      cmd.stderr.on('data', function (data) {
        _betterConsole2['default'].log('stderr: ' + data);
      });
      cmd.stdout.on('data', function (data) {
        var logEntries = data.toString().split('\n');
        for (var i = 0; i < logEntries.length; i++) {
          var logEntry = logEntries[i].trim();
          if (logEntry.length) {
            if (logEntry.indexOf('Validations:DBG Val') > 0) {
              try {
                var _entry = new _validation_log_entry2['default'](logEntry);
                _this.onValidation(_entry.toJSON());
              } catch (err) {
                _betterConsole2['default'].err('' + err + ': ' + entry);
              }
            }
          }
        }
      });
    }
  }, {
    key: 'onValidation',
    value: function onValidation(logEntry) {
      _betterConsole2['default'].log(JSON.stringify(logEntry));
    }
  }]);

  return RippledLogMonitor;
})();

exports['default'] = RippledLogMonitor;
module.exports = exports['default'];