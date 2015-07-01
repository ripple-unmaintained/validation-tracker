import ValidationTracker from '../validation_tracker'
import request from 'superagent'

export default class HttpValidationTracker extends ValidationTracker {
  constructor(rippledPubKey, url) {
    super(rippledPubKey)
    this.url = url
  }

  // @override
  onValidation(validation) {
    request
    .post(this.url)
    .send({
      validation_public_key: validation.public_key,
      ledger_hash: validation.hash,
      reporter_public_key: this.rippledPubKey
    })
    .end((err, res) => {
      if (err) {
        console.log('HTTP Service Error', err.message, res.text)
      } else {
        console.log('Submitted validation to http service:', JSON.stringify(validation))
      }
    })
  }
}


