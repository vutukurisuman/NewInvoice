const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
// let User = require('../app');
module.exports.register = (req, res, next) => {
    console.log("test",req.body);
    
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.empid = req.body.empid;
    user.phonenumber = req.body.phonenumber;

    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
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

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    let password=JSON.parse(JSON.stringify(req.body.password).replace(/"\s+|\s+"/g,'"'))

    User.findOne({ "email": email,"password":password },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,["email","firstName","lastName","password"]) });
        }
    );
}
module.exports.allemployes = (req, res) => {
    User.find(function (err, inwarts) {
        if (err) return console.error(err);   
        res.send(inwarts);
    })
}