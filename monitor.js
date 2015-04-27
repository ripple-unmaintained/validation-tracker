import RippledLogMonitor from './lib/rippled_log_monitor'
import Hbase from 'hbase'
import StatsD from 'node-statsd'
import Promise from 'bluebird'
import Moment from 'moment'

Promise.promisifyAll(Hbase);

const RIPPLED_LOG_PATH = process.env.RIPPLED_LOG_PATH || '/var/log/rippled/debug.log'

class HbaseValidationLogger extends RippledLogMonitor {
  constructor() {
    this.client = Hbase({
      host: process.env.HBASE_HOST,
      port: process.env.HBASE_PORT
    })
    super()
  }
  // @override
  onValidation(entry) {
    let row = this.client.table(process.env.HBASE_TABLE)
      // Use "public_key|ledger_hash" as row name
      .row(`${entry.public_key}|${entry.hash}`)

    row.putAsync('validation:public_key', entry.public_key)
      .then(row.putAsync('validation:hash', entry.hash))
      .then(row.putAsync('validation:datetime', Moment(new Date(entry.datetime)).format("YYYYMMDDHHmmss")))
      .then(console.log('saved validation in hbase'))
      .error(function(err) {
        console.error('hbase put error', err)
      })
  }
}

class StatsdValidationLogger extends RippledLogMonitor {
  constructor() {
    this.client = new StatsD({
      host: process.env.STATSD_HOST,
      port: process.env.STATSD_PORT
    })
    super()
  }
  // @override
  onValidation(entry) {
    this.client.increment(entry.public_key, 1)
  }
}

class HbaseLedgerLogger extends RippledLogMonitor {
  constructor() {
    this.client = Hbase({
      host: process.env.HBASE_HOST,
      port: process.env.HBASE_PORT
    })
    super()
  }
  // @override
  onLedger(entry) {
    let row = this.client.table(process.env.HBASE_TABLE)
      // Use "node uuid|ledger sequence" as row name
      .row(`${process.env.UUID}|${entry.sequence}`)

    row.putAsync('ledger:sequence', entry.sequence)
    .then(row.putAsync('ledger:datetime', Moment(new Date(entry.datetime)).format("YYYYMMDDHHmmss")))
      .then(console.log('saved ledger in hbase'))
      .error(function(err) {
        console.error('hbase put error', err)
      })
  }
}

let monitor = new HbaseValidationLogger()
let statsdMonitor = new StatsdValidationLogger()
let ledgerMonitor = new HbaseLedgerLogger();

monitor.monitorFile(RIPPLED_LOG_PATH)
statsdMonitor.monitorFile(RIPPLED_LOG_PATH)
ledgerMonitor.monitorFile(RIPPLED_LOG_PATH)