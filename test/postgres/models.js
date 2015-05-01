import {database, models} from '../../lib/postgres'

models.Ledger.findAll({ limit: 2 }).then(ledgers => {
  ledgers.forEach(ledger => {
    console.log(ledger.toJSON())
  })
})


models.Node.findAll({ limit: 2 }).then(nodes => {
  nodes.forEach(node => {
    console.log(node.toJSON())
  })
})

models.Validation.findAll({ limit: 2 }).then(validations => {
  validations.forEach(validation => {
    console.log(validation.toJSON())
  })
})
