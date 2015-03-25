const mongoose = require('mongoose')

const MONGO_HOST = process.env.MONGO_HOST || '52.74.25.53'
const MONGO_PORT = process.env.MONGO_PORT || 22222
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'rippletestnet'

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`)

export default mongoose

