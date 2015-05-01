import ValidationTracker from '../rippled_log_monitor'
import assert from 'assert'

const MODEL_ERROR_MESSAGE = 'getter property "model" must be overridden'

export default class SqlValidationTracker extends ValidationTracker {

  constructor() {
    assert(this.model, MODEL_ERROR_MESSAGE)
  }

  // @abstract
  get model() {
    throw new Error(MODEL_ERROR_MESSAGE)
  }

  onData(validation) {
    console.log('ON DATA', validation)
    return this.model.findOrCreate({ where: {
      ledger_hash: validation.hash,
      public_key: validation.public_key
    }})
  }
}

