import Hbase from 'hbase'
import StatsD from 'node-statsd'
import Promise from 'bluebird'
import ValidationTracker from './validation_tracker'

const RIPPLED_LOG_PATH = process.env.RIPPLED_LOG_PATH || '/var/log/rippled/debug.log'
const RIPPLED_PUBKEY_NODE = process.env.RIPPLED_PUBKEY_NODE

module.exports = function(options) {

  if (!RIPPLED_PUBKEY_NODE) {
    return console.log('RIPPLED_PUBKEY_NODE required')
  }

  let trackers = []

  if (options.http) {
    let HttpValidationTracker = require('./http/validation_tracker')
    if (!process.env.HTTP_SERVICE_URL) {
      return console.log('HTTP_SERVICE_URL required')
    }
    trackers.push(new HttpValidationTracker(RIPPLED_PUBKEY_NODE, process.env.HTTP_SERVICE_URL))
  }

  if (options.hbase) {
    let HbaseValidationTracker = require('./hbase/validation_tracker')
    Promise.promisifyAll(Hbase)
    let hbaseClient = Hbase({
      host: process.env.HBASE_HOST,
      port: process.env.HBASE_PORT
    })
    trackers.push(new HbaseValidationTracker(RIPPLED_PUBKEY_NODE, hbaseClient))
  }

  if (options.postgres) {
    let PostgresValidationTracker = require('./postgres/validation_tracker')
    trackers.push(new PostgresValidationTracker(RIPPLED_PUBKEY_NODE))
  }

  if (options.graphite) {
    let StatsdValidationTracker = require('./statsd/validation_tracker')
    let statsdClient = new StatsD({
      host: process.env.STATSD_HOST,
      port: process.env.STATSD_PORT
    })
    trackers.push(new StatsdValidationTracker(RIPPLED_PUBKEY_NODE, statsdClient))
  }

  if (options.stdout) {
    trackers.push(new ValidationTracker(RIPPLED_PUBKEY_NODE))
  }

  trackers.forEach(tracker => {
    tracker.monitorFile(RIPPLED_LOG_PATH)
  })
}
