import Sequelize from 'sequelize'
import sequelize from '../database'

export default sequelize.define('Validation', {
  ledger_id: Sequelize.INTEGER,
  node_id: Sequelize.INTEGER,
  timestamp: Sequelize.DATE
}, {
  timestamps: true,
  underscored: true,
  tableName: 'validations'
})

