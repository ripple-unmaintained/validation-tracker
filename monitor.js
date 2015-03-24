
import RippledLogMonitor from './lib/rippled_log_monitor'

const RIPPLED_LOG_PATH = process.env.RIPPLED_LOG_PATH || '/var/log/rippled/debug.log'

class Monitor extends RippledLogMonitor {

  // @override
  onValidation(entry) {
    console.log('NEW VALIDATION!', entry)
  }
}

let monitor = new Monitor()

monitor.monitorFile(RIPPLED_LOG_PATH)

