import Ledger from './models/ledger'
import Node from './models/node'
import Validation from './models/validation'
import database from './database'

Validation.belongsTo(Ledger)
Validation.belongsTo(Node)

export default {
  database: database,
  models: {
    Node: Node,
    Ledger: Ledger,
    Validation: Validation
  }
}
