
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Star = mongoose.model('Star');
const Nexmo = require('nexmo');

module.exports.alldatas = (req, res) => {
    // console.log("gfhjk",req.body)
    var star = new Star();
   
    star.title = req.body.title; 
    star.category = req.body.category;
    star.created = req.body.created;
    star.vat = req.body.vat;
    star.comments = req.body.comments;
    star.paymentbank = req.body.paymentbank;
    star.itemquan = req.body.itemquan;
    star.itemname = req.body.itemname;
    star.itemcost = req.body.itemcost;
    star.price = req.body.price;
    star.subtotal = req.body.subtotal;
    star.vatper = req.body.vatper;
    star.total = req.body.total;
    star.payment ="Pending";
    star.status ="Active";
    star.folder = "";
    star.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return console.error(err); 
        }
    });
}

module.exports.getactiveexpenses = (req, res) => {
    Star.find(function (err, star) {
        if (err) return console.error(err);   
        res.send(star);
    })
}

module.exports.postfnameexp = (req, res) => {
    // console.log(req.body)
    let name =JSON.parse(JSON.stringify(req.body.folder).replace(/"\s+|\s+"/g,'"'))
    Star.find({'folder':name},function (err, inwarts) {
        if (err) 
        return console.error(err);   
        res.send(inwarts);
    })
}

module.exports.updateexpoption = (req, res) => {
    let option=JSON.parse(JSON.stringify(req.body.option).replace(/"\s+|\s+"/g,'"'))
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))


    Star.updateMany({'title':invnum},{$set: {'payment':option}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.sendfoldername = (req, res) => {
    // console.log(req.body)
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))
    let name=JSON.parse(JSON.stringify(req.body.folder).replace(/"\s+|\s+"/g,'"'))

    Star.updateMany({'title':invnum},{$set: {'folder':name,'status':"Archived"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}
module.exports.checkedexp = (req, res) => {
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))
    Star.find({'title':invnum },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.toarchive = (req, res) => {
    let invnum=JSON.parse(JSON.stringify(req.body.ids.invnum).replace(/"\s+|\s+"/g,'"'))
 
    console.log("feef",req.body)
    Inwart.updateMany({'title':invnum },{$set: {'status':"Archived"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}
module.exports.toarchiveexp = (req, res) => {
    let invnum=JSON.parse(JSON.stringify(req.body.ids.invnum).replace(/"\s+|\s+"/g,'"'))
 
    console.log("feef",req.body)
    Star.updateMany({'title':invnum },{$set: {'status':"Archived"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.gettitledata = (req, res) => {
    console.log(req.body)
    let deptname=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    Star.find({'title':deptname},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}



module.exports.getarchiveexpense = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.archive).replace(/"\s+|\s+"/g,'"'))
    Star.find({'status':archivedata},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}



module.exports.getactivedata = (req, res) => {  
    Star.find({'status':"Active"},function (err, star) {
        if (err)
         return console.error(err); 
         res.send(star);  
     })
}

module.exports.getarchiveddata = (req, res) => {  
    Star.find({'status':"Archived"},function (err, star) {
        if (err)
         return console.error(err); 
         res.send(star);  
     })
}

module.exports.getmonthexp = (req, res) => {
    console.log(req.body)
    let month=JSON.parse(JSON.stringify(req.body.month).replace(/"\s+|\s+"/g,'"'))
    Star.find({'created.month':month},function (err,exp) {
        if (err)
         return console.error(err); 
         res.send(exp);  
     })
}




