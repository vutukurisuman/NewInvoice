const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Events = mongoose.model('Events');

module.exports.postevent = (req, res, next) => {
    console.log(req.body)
    var events = new Events();
    events.title = req.body.title;
    events.start = req.body.start;
    events.end = req.body.end;
    events.primary = req.body.primary;
    events.secondary = req.body.secondary;
    events.draggable = req.body.draggable
    events.save((err, doc) => {
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

module.exports.getevent = (req, res) => {
    Events.find(function (err, event) {
        if (err) return console.error(err);   
        res.send(event);
    })
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}