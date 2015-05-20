import ValidationTracker from '../validation_tracker'
import Moment from 'moment'

export default class HbaseValidationTracker extends ValidationTracker {
  constructor(hbaseClient) {
    super()
    this.client = hbaseClient
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


