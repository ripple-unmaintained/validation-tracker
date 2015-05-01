import Sequelize from 'sequelize'
import sequelize from './database'

export default sequelize.define('Validation', {
  ledger_hash: Sequelize.STRING,
  public_key: Sequelize.STRING,
  timestamp: Sequelize.DATE
}, {
  timestamps: true,
  underscored: true,
  tableName: 'validations'
})

