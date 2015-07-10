import ValidationTracker from '../validation_tracker'
import request from 'superagent'

export default class HttpValidationTracker extends ValidationTracker {
  constructor(rippledPubKey, url, auth_user, auth_pass) {
    super(rippledPubKey)
    this.url = url
    this.auth_user = auth_user || ''
    this.auth_pass = auth_pass || ''
  }

  // @override
  onValidation(validation) {
    request
    .post(this.url)
    .auth(this.auth_user, this.auth_pass)
    .send({
      validation_public_key: validation.public_key,
      ledger_hash: validation.hash,
      reporter_public_key: this.rippledPubKey
    })
    .end((err, res) => {
      if (err) {
        console.log('HTTP Service Error', err.message)
      } else {
        console.log('Submitted validation to http service:', JSON.stringify(validation))
      }
    })
  }
}


