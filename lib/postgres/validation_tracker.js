import ValidationTracker from '../rippled_log_monitor'
import {models} from './'
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
    var node, ledger, validation

    return models.Node.findOrCreate({ where: {
      validation_public_key: validation.public_key
    }})
    .then(_node => {
      node = _node
      return models.Ledger.findOrCreate({ where: {
        ledger_hash: validation.hash
      }})
    })
    .then(_ledger => {
      ledger = _ledger
      return this.model.findOrCreate({ where: {
        ledger_id: ledger.id,
        node_id: node.id
      }})
    })
  }
}

