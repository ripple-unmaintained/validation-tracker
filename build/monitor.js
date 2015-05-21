'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hbase = require('hbase');

var _hbase2 = _interopRequireDefault(_hbase);

var _nodeStatsd = require('node-statsd');

var _nodeStatsd2 = _interopRequireDefault(_nodeStatsd);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _validation_tracker = require('./validation_tracker');

var _validation_tracker2 = _interopRequireDefault(_validation_tracker);

var RIPPLED_LOG_PATH = process.env.RIPPLED_LOG_PATH || '/var/log/rippled/debug.log';

module.exports = function (options) {

  var trackers = [];

  if (options.hbase) {
    var HbaseValidationTracker = require('./hbase/validation_tracker');
    _bluebird2['default'].promisifyAll(_hbase2['default']);
    var hbaseClient = (0, _hbase2['default'])({
      host: process.env.HBASE_HOST,
      port: process.env.HBASE_PORT
    });
    trackers.push(new HbaseValidationTracker(hbaseClient));
  }

  if (options.postgres) {
    var PostgresValidationTracker = require('./postgres/validation_tracker');
    trackers.push(new PostgresValidationTracker());
  }

  if (options.graphite) {
    var StatsdValidationTracker = require('./statsd/validation_tracker');
    var statsdClient = new _nodeStatsd2['default']({
      host: process.env.STATSD_HOST,
      port: process.env.STATSD_PORT
    });
    trackers.push(new StatsdValidationTracker(statsdClient));
  }

  if (options.stdout) {
    trackers.push(new _validation_tracker2['default']());
  }

  trackers.forEach(function (tracker) {
    tracker.monitorFile(RIPPLED_LOG_PATH);
  });
};