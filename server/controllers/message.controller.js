const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const mongoose = require('mongoose');

const Message = mongoose.model('message');

module.exports.newmessage = (req, res) => {
    // console.log("ddddd",req.body)
    const today = new Date()
    var message =new Message();
    message.email=req.body.email
    message.created= today
        var  Allmessages=[{
            operator : req.body.operator,
            message : req.body.message,
      
        }]
        message.Allmessages=Allmessages,

        message.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
module.exports.particularmessage = (req, res) => {
    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    Message.find({"email":email },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }

  module.exports.messagepush = (req, res) => {
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))
    let message=JSON.parse(JSON.stringify(req.body.message).replace(/"\s+|\s+"/g,'"'))
    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    Message.updateMany({"email":email },  {$push: {Allmessages:{ $each: [ { 'operator': operator, 'message': message }],}}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.json({status:"true"});
     })
  }