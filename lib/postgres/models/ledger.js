import Sequelize from 'sequelize'
import sequelize from '../database'

export default sequelize.define('Ledger', {
  ledger_hash: Sequelize.STRING
}, {
  timestamps: true,
  underscored: true,
  tableName: 'ledgers'
})

