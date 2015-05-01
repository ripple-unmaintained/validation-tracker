require(__dirname+'/../environment')

import database from '../sql/database'

console.log(database)

database.sync().then(result => {
  console.log('migration success!')
})

