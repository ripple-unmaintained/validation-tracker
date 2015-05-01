import Sequelize from 'sequelize'

const DATABASE_URL = process.env['VALIDATION_TRACKER_POSTGRES_URL']

console.log('DATABASE_URL', DATABASE_URL)

export default new Sequelize(DATABASE_URL)

