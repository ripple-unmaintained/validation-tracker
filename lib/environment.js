import path from 'path'
import dotenv from 'dotenv'

const PATH = path.join(__dirname,'/../.env')

dotenv.config({
  path: PATH
})

dotenv.load()

