const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Folders = mongoose.model('Folders');

module.exports.postfolders = (req, res, next) => {
    console.log("dddd",req.body)
    var folders = new Folders();
    folders.name = req.body.name;
    
    folders.save((err, doc) => {
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

module.exports.getfolders = (req, res) => {
    Folders.find(function (err, event) {
        if (err) return console.error(err);   
        res.send(event);
    })
}