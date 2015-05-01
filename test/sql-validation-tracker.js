import SqlValidationTracker from '../lib/sql/validation_tracker'
import Validation from '../lib/sql/validation'
import database from '../lib/sql/database'
import assert from 'assert'

describe('SQL validation tracker', () => {
  before((done) => {
    database.sync().then(() => {
      done()
    })
  })

  it('should write a validation to the database', (done) => {

    class Tracker extends SqlValidationTracker {
      // @override
      get model() {
        return Validation
      }

      onData(validation) {
        console.log('@Override onData', validation)
        super.onData(validation).spread((record, created) => {
          assert(record)
          if (created) {
            console.log('recorded in database')
          } else {
            console.log('found record in database')
          }
          done()
        })
        .catch(error => {
          console.log('ERROR!', error)
        })
      }
    }

    let tracker = new Tracker()

    tracker.onData({
      hash: '12345',
      public_key: '678910' 
    })

    tracker.onData({
      hash: '12345',
      public_key: '678910' 
    })
  })
})

