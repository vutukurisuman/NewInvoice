const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const VendordocsSchema = new Schema({
   
    name: {
        type: String
      },
      avatar: {
        type: String
      },
      vendor: {
        type: String
      },
      date: {
        type: String
      },
       month: {
        type: String
      }, 
      year: {
        type: String
      },
})

module.exports = Vendordoc = mongoose.model('vendordoc', VendordocsSchema)
