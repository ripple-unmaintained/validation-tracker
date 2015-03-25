import RippledLogMonitor from './lib/rippled_log_monitor'
import Validation from './lib/validation'
import mongo from './lib/mongoose'

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

let monitor = new MongoValidationLogger()

mongo.connection.once('open', callback => {
  console.log('mongodb connected')
  monitor.monitorFile(RIPPLED_LOG_PATH)
})

mongo.connection.on('error', error => {
  console.error('mongo connection error:', error)
  process.exit(0)
})

