import assert from 'assert'
import ValidationLogEntry from '../lib/validation_log_entry'

describe('ValidationLogEntry', function(){
  describe('constructor()', function(){
    it('should accept a valid rippled validation log entry', function(){
      let logEntry = '2015-Jun-02 23:12:22 Validations:DBG Val for 886C3F47E687C0C0444F899E79D6514853447B3CC1913F0FAFBCF691B4558EF1 from n9L81uNCaPgtUJfaHh89gmdvXKAmSt5Gdsw2g1iPWaPkAHW5Nm4C added trusted/current'
      let entry = new ValidationLogEntry(logEntry)
    })
    it('should throw on invalid rippled validation log entries', function(){
      try {
        let logEntry = '2015-Jun-02 23:12:22 Validations:DBG Val'
        let entry = new ValidationLogEntry(logEntry)
      }
      catch(err) {
        assert.equal(err.message, 'Invalid log entry')
      }
    })
    it('should throw on invalid validation public keys', function(){
      try {
        let logEntry = '2015-Jun-02 23:12:22 Validations:DBG Val for 886C3F47E687C0C0444F899E79D6514853447B3CC1913F0FAFBCF691B4558EF1 from /validators/ added trusted/current'
        let entry = new ValidationLogEntry(logEntry)
      }
      catch(err) {
        assert.equal(err.message, 'Invalid validation public_key')
      }
    })    
  })
})