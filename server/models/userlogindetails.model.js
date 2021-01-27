const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserLOginSchema = new Schema({
  email: {
    type: String,
    required: true

  },
  id: {
    type: String
  },
  ip: {
    type: String
  },
  logintime: {
    type: String,
  },
  logouttime: {
    type: String
  },
   date: {
    type: String,
    // default: Date.now
  }
})

module.exports  = mongoose.model('LOGIN', UserLOginSchema)
