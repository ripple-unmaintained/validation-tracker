import ValidationTracker from '../validation_tracker.js'

export default class StatsdValidationTracker extends ValidationTracker {
  constructor(rippledPubKey, statsdClient) {
    super(rippledPubKey)
    this.client = statsdClient
  }
  // @override
  onValidation(entry) {
    this.client.increment(entry.public_key, 1)
    console.log('sent increment to graphite for', entry.public_key)
  }
}

