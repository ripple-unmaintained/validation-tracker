const mongoose = require('./mongoose')

export default mongoose.model('Validation', {
  hash: String,
  public_key: String,
  datetime: Date
})

