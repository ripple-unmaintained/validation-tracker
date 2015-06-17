import ValidationTracker from '../validation_tracker'
import {models} from './'

export default class SqlValidationTracker extends ValidationTracker {

  onValidation(validation) {
    var node, ledger, validation

    return models.Node.findOrCreate({ where: {
      validation_public_key: validation.public_key
    }})
    .spread((_node, created) => {
      node = _node
      return models.Ledger.findOrCreate({ where: {
        ledger_hash: validation.hash
      }})
    })
    .spread((_ledger, created) => {
      ledger = _ledger
      return models.Validation.create({ where: {
        ledger_id: ledger.id,
        node_id: node.id,
        reporter_public_key: this.rippledPubKey
      }})
    })
    .spread((_validation, created) => {
       console.log('saved validation in postgres', _validation.toJSON())
    })
    .catch(error => {
       console.log('PSQL Error', error)
    })
  }
}

