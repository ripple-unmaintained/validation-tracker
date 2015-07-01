import {spawn,exec} from 'child_process'
import console from 'better-console' 
import ValidationLogEntry from './validation_log_entry'

export default class RippledLogMonitor {

  constructor(rippledPubKey) {
    this.rippledPubKey = rippledPubKey
  }

  monitorFile(filename) {
    console.log('Path: ', filename)
    let cmd = spawn("tail", ["-F",filename])
    cmd.stderr.on("data", data => {
      console.log('stderr: ' + data)
    })
    cmd.stdout.on("data", data => {
      let logEntries = data.toString().split("\n")
      for (let i=0; i<logEntries.length; i++) {
        let logEntry = logEntries[i].trim()
        if (logEntry.length) {
          if (logEntry.indexOf("Validations:DBG Val") > 0) {
            try {
              let entry = new ValidationLogEntry(logEntry)
              this.onValidation(entry.toJSON())
            }
            catch(err) {
              console.error(`${err}: ${logEntry}`)
            }
          }
        }
      }
    })
  }

  onValidation(logEntry) {
    console.log(JSON.stringify(logEntry))
  }
}

