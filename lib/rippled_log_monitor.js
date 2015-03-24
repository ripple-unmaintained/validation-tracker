import {spawn,exec} from 'child_process'
import console from 'better-console' 

const MASTER_PATH = require('../config').master_config.master_path;

export default class RippledLogMonitor {

  monitorFile(filename) {
    console.log('Path: ', filename)
    let cmd = spawn("tail", ["-F",filename])
    cmd.stderr.on("data", data => {
      console.log('stderr: ' + data)
    })
    cmd.stdout.on("data", data => {
      let logEntries = (""+data).split("\n")
      for (let i=0; i<logEntries.length; i++) {
        let logEntry = logEntries[i].trim()
        if (logEntry.length) {
          this.handleLogEntry(logEntry)
        }
      }
    })
  }

  handleLogEntry(logEntry) {
    if (logEntry.indexOf("Validations:DBG Val") > 0) {

      let logEntrySplit = logEntry.split(" ")

      let val_package = {
        public_key: logEntrySplit[7],
        trusted: logEntrySplit[9],
        ping_datetime: logEntrySplit[0]+" "+logEntrySplit[1],
        ping_id: 1
      }

      //Write to master log filogEntry through ssh.
      exec("echo '"+JSON.stringify(val_package)+"' | ssh "+ip+" 'cat >> "+MASTER_PATH+"'")
      console.log(JSON.stringify(val_package))
    }
  }
}

