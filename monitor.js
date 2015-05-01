import HbaseValidationTracker from './lib/hbase/validation_tracker'
import StatsdValidationTracker from './lib/statsd/validation_tracker'
import PostgresValidationTracker from './lib/postgres/validation_tracker'
import Hbase from 'hbase'
import StatsD from 'node-statsd'
import Promise from 'bluebird'
const RIPPLED_LOG_PATH = process.env.RIPPLED_LOG_PATH || '/var/log/rippled/debug.log'

Promise.promisifyAll(Hbase)

let hbaseClient = Hbase({
  host: process.env.HBASE_HOST,
  port: process.env.HBASE_PORT
})

let statsdClient = new StatsD({
  host: process.env.STATSD_HOST,
  port: process.env.STATSD_PORT
})

let trackers = [
  new HbaseValidationTracker(hbaseClient),
  new StatsdValidationTracker(statsdClient),
  new PostgresValidationTracker()
]

trackers.forEach(tracker => {
  tracker.monitorFile(RIPPLED_LOG_PATH)
})
