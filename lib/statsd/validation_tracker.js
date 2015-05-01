import ValidationTracker from '../validation_tracker.js'

export default class StatsdValidationTracker extends ValidationTracker {
  constructor(statsdClient) {
    this.client = statsdClient
    super()
  }
  // @override
  onValidation(entry) {
    this.client.increment(entry.public_key, 1)
  }
}

