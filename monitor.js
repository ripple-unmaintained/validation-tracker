import Hbase from 'hbase'
import StatsD from 'node-statsd'
import Promise from 'bluebird'
import ValidationTracker from './lib/validation_tracker'

const RIPPLED_LOG_PATH = process.env.RIPPLED_LOG_PATH || '/var/log/rippled/debug.log'

module.exports = function(options) {

  let trackers = []

  if (options.hbase) {
    let HbaseValidationTracker = require('./lib/hbase/validation_tracker')
    Promise.promisifyAll(Hbase)
    let hbaseClient = Hbase({
      host: process.env.HBASE_HOST,
      port: process.env.HBASE_PORT
    })
    trackers.push(new HbaseValidationTracker(hbaseClient))
  }

  if (options.postgres) {
    let PostgresValidationTracker = require('./lib/postgres/validation_tracker')
    trackers.push(new PostgresValidationTracker())
  }

  if (options.graphite) {
    let StatsdValidationTracker = require('./lib/statsd/validation_tracker')
    let statsdClient = new StatsD({
      host: process.env.STATSD_HOST,
      port: process.env.STATSD_PORT
    })
    trackers.push(new StatsdValidationTracker(statsdClient))
  }

  if (options.stdout) {
    trackers.push(new ValidationTracker())
  }

  trackers.forEach(tracker => {
    tracker.monitorFile(RIPPLED_LOG_PATH)
  })
}
