import RippledLogMonitor from './lib/rippled_log_monitor'
import Validation from './lib/validation'
import mongo from './lib/mongoose'
import StatsD from 'node-statsd'

const RIPPLED_LOG_PATH = process.env.RIPPLED_LOG_PATH || '/var/log/rippled/debug.log'

class MongoValidationLogger extends RippledLogMonitor {
  // @override
  onValidation(entry) {
    Validation.create(entry, (error, record) => {
      if (error) {
        return console.error('mongo create error', error)
      }
      console.log('saved validation in mongo', record)
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

let monitor = new MongoValidationLogger()
let statsdMonitor = new StatsdValidationLogger()

statsdMonitor.monitorFile(RIPPLED_LOG_PATH)

mongo.connection.once('open', callback => {
  console.log('mongodb connected')
  monitor.monitorFile(RIPPLED_LOG_PATH)
})

mongo.connection.on('error', error => {
  console.error('mongo connection error:', error)
  process.exit(0)
})

