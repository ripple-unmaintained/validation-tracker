import Sequelize from 'sequelize'
import sequelize from '../database'

export default sequelize.define('Node', {
  validation_public_key: Sequelize.STRING,
}, {
  timestamps: true,
  underscored: true,
  tableName: 'nodes'
})

