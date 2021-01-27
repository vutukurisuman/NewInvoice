const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const mongoose = require('mongoose');

const Addbene = mongoose.model('LOGIN');

module.exports.logindata = (req, res,next) => {
    const today = new Date()
    const date = today.toDateString()
    // const login= Addbene()
    const userData ={
    logintime:req.body.logintime,
    logouttime:req.body.logouttime,
    id:req.body.id,
    email: req.body.email,
    ip:req.body.ip,
    date:date
}

    Addbene.findOne({
        email: req.body.email,
        date:date
      })
        //TODO bcrypt
        .then(user => {
          if (!user) {
            Addbene.create(userData)
              .then(user => {
                const payload = {
                  _id: user._id,
                  ip: user.ip,
                  email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: 1440
                })
                res.json({ token: token })
              })
              .catch(err => {
                res.send('error: ' + err)
              })
          } else {
            res.json({ error: 'User already exists' })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
}

module.exports.getlogindata = (req, res) => {
    Addbene.find(function (err, stus) {
        if (err) return console.error(err);   
        res.send(stus);

    })
}

module.exports.getlogindatabyid = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    Addbene.find({"id":userid },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }
  module.exports.logoutdatabyid = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    let logouttime=JSON.parse(JSON.stringify(req.body.logouttime).replace(/"\s+|\s+"/g,'"'))
    Addbene.updateMany({"email":userid },{$set: {'logouttime':logouttime}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }

  module.exports.logingetbydate = (req,res) => {
    const today = new Date()
    const date = today.toDateString()
    Addbene.find({
        date:date
      },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }
  module.exports.logindetails =(req,res) => {
    Addbene.aggregate([
        {
          $group: {
            _id: {
              username: "$id",
              year: { $year: "$eventDate" },
              month: { $month: "$eventDate" },
              day: { $dayOfMonth: "$eventDate" }
            },
            firstLogin: {
              $min: {
                $cond: [{ $and: [{ $eq: ["$type", "logintime"] }] }, "$eventDate", null]
              }
            },
            lastLogout: {
              $max: {
                $cond: [{ $and: [{ $eq: ["$type", "logouttime"] }] }, "$eventDate", null]
              }
            }
          }
        },
        {
            $project: {
                _id: 1,
                username : '$_id.email',
                firstLogin :1,
                lastLogout :1
                }
            }
      ],function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     }
      );
  }