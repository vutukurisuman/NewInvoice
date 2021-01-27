const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const MessageSchema = new Schema({
   
    email : {
          type: String,
        },
    
  date: {
    type: Date,
    default: Date.now
  },

    Allmessages:[{
          operator : {
            type: String,
          },
          message : {
            type: String,
          }, 

}],
})

module.exports = message = mongoose.model('message', MessageSchema)
