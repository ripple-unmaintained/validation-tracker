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
var RIPPLED_PUBKEY_NODE = process.env.RIPPLED_PUBKEY_NODE;

module.exports = function (options) {

  if (!RIPPLED_PUBKEY_NODE) {
    return console.log('RIPPLED_PUBKEY_NODE required');
  }

  var trackers = [];

  if (options.http) {
    var HttpValidationTracker = require('./http/validation_tracker');
    if (!process.env.HTTP_SERVICE_URL) {
      return console.log('HTTP_SERVICE_URL required');
    }
    trackers.push(new HttpValidationTracker(RIPPLED_PUBKEY_NODE, process.env.HTTP_SERVICE_URL, process.env.HTTP_AUTH_USER, process.env.HTTP_AUTH_PASS));
  }

  if (options.hbase) {
    var HbaseValidationTracker = require('./hbase/validation_tracker');
    _bluebird2['default'].promisifyAll(_hbase2['default']);
    var hbaseClient = (0, _hbase2['default'])({
      host: process.env.HBASE_HOST,
      port: process.env.HBASE_PORT
    });
    trackers.push(new HbaseValidationTracker(RIPPLED_PUBKEY_NODE, hbaseClient));
  }

  if (options.postgres) {
    var PostgresValidationTracker = require('./postgres/validation_tracker');
    trackers.push(new PostgresValidationTracker(RIPPLED_PUBKEY_NODE));
  }

  if (options.graphite) {
    var StatsdValidationTracker = require('./statsd/validation_tracker');
    var statsdClient = new _nodeStatsd2['default']({
      host: process.env.STATSD_HOST,
      port: process.env.STATSD_PORT
    });
    trackers.push(new StatsdValidationTracker(RIPPLED_PUBKEY_NODE, statsdClient));
  }

  if (options.stdout) {
    trackers.push(new _validation_tracker2['default'](RIPPLED_PUBKEY_NODE));
  }

  trackers.forEach(function (tracker) {
    tracker.monitorFile(RIPPLED_LOG_PATH);
  });
};