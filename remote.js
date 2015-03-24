import RippledLogMonitor from './lib/rippled_log_monitor'

const RIPPLED_LOG_PATH = process.env.RIPPLED_LOG_PATH || '/var/log/rippled/debug.log'

let monitor = new RippledLogMonitor()

monitor.monitorFile(RIPPLED_LOG_PATH)

