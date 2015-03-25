
import Validation from '../lib/validation'

Validation
  .create({
    hash: 12345,
    public_key: 678910,
    date: new Date()
  }, (err, validation) => {
    console.log(err, validation) 

    Validation
      .find()
      .exec((err, validations) => {
        console.log(err, validations)
        
        Validation.remove({}, console.log)
      })
  })
  
