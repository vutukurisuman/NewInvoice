const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Purchase = mongoose.model('Purchase');

module.exports.purchasepost = (req, res) => {
    var purchase = new Purchase();
    purchase.invoice = req.body.invoice; 
    purchase.credit = req.body.credit; 
    purchase.shipping = req.body.shipping;
    purchase.delivery = req.body.delivery;
    purchase.title = req.body.title; 
    purchase.tax = req.body.tax;
    purchase.email = req.body.email;
    purchase.phonenumber = req.body.phonenumber;
    purchase.address = req.body.address;
    purchase.state = req.body.state;
    purchase.country = req.body.country;
    purchase.city = req.body.city;
    purchase.model = req.body.model;
    purchase.model1 = req.body.model1;
    purchase.itemquan = req.body.itemquan;
    purchase.itemname = req.body.itemname;
    purchase.itemcost = req.body.itemcost;
    purchase.price = req.body.price;
    purchase.subtotal = req.body.subtotal;
    purchase.vatper = req.body.vatper;
    purchase.total = req.body.total;
    purchase.comments = req.body.comments;
    purchase.paymentbank = req.body.paymentbank;
    purchase.date = new Date();
    purchase.payment ="Pending";
    purchase.status ="Active";
    purchase.folder ="Purchase";
    purchase.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return console.error(err); 
        }
    });
}


module.exports.allpurchaseorders = (req, res) => {
    Purchase.find({},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.purchaseactive = (req, res) => {
    Purchase.find({'status':"Active"},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getvpurchasedata = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.folder).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
   
   
   Purchase.find({'title':archivedata,'status':status},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.purchasearchive = (req, res) => {
    Purchase.find({'status':"Archived"},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.purchasechecked = (req, res) => {
    let purchnum=JSON.parse(JSON.stringify(req.body.purchnum.invnum).replace(/"\s+|\s+"/g,'"'))
    Purchase.updateMany({'invoice':purchnum },{$set: {'status':"Archived"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.updatepurchaseoption = (req, res) => {
    let option=JSON.parse(JSON.stringify(req.body.option).replace(/"\s+|\s+"/g,'"'))
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))
    Purchase.updateMany({'invoice':invnum},{$set: {'payment':option}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.apppurchaseorders = (req, res) => {
    let option=JSON.parse(JSON.stringify(req.body.appid).replace(/"\s+|\s+"/g,'"'))
    Purchase.find({'invoice':option},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}
module.exports.getpurchasedata = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.foldername).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
   
    Purchase.find({'title':archivedata,'status':status},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}