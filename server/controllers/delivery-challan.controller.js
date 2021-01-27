const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Deliverycha = mongoose.model('Deliverycha');

module.exports.deliverypost = (req, res) => {
    var deliverycha = new Deliverycha();
    deliverycha.invoice = req.body.invoice; 
    deliverycha.shipping = req.body.shipping;
    deliverycha.delivery = req.body.delivery;
    deliverycha.title = req.body.title; 
    deliverycha.tax = req.body.tax;
    deliverycha.email = req.body.email;
    deliverycha.phonenumber = req.body.phonenumber;
    deliverycha.address = req.body.address;
    deliverycha.state = req.body.state;
    deliverycha.country = req.body.country;
    deliverycha.city = req.body.city;
    deliverycha.model = req.body.model;
    deliverycha.model1 = req.body.model1;
    deliverycha.itemquan = req.body.itemquan;
    deliverycha.itemname = req.body.itemname;
    deliverycha.itemcost = req.body.itemcost;
    deliverycha.price = req.body.price;
    deliverycha.subtotal = req.body.subtotal;
    deliverycha.vatper = req.body.vatper;
    deliverycha.total = req.body.total;
    deliverycha.comments = req.body.comments;
    deliverycha.paymentbank = req.body.paymentbank;
    deliverycha.payment ="Pending";
    deliverycha.status ="Active";
    deliverycha.folder ="Deliverycha";
    deliverycha.operator = req.body.operator; 
    deliverycha.date = new Date();

    deliverycha.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return console.error(err); 
        }
    });
}


module.exports.alldeliverychaorders = (req, res) => {
    Deliverycha.find({},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.deliverychaactive = (req, res) => {
    Deliverycha.find({'status':"Active"},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.deliverychaarchive = (req, res) => {
    Deliverycha.find({'status':"Archived"},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.deliverychachecked = (req, res) => {
    let purchnum=JSON.parse(JSON.stringify(req.body.purchnum.invnum).replace(/"\s+|\s+"/g,'"'))
    Deliverycha.updateMany({'invoice':purchnum },{$set: {'status':"Archived"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.getdeliverydata = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.folder).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
   
   
    Deliverycha.find({'title':archivedata,'status':status},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.updatedeliverychaoption = (req, res) => {
    let option=JSON.parse(JSON.stringify(req.body.option).replace(/"\s+|\s+"/g,'"'))
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))
    Deliverycha.updateMany({'invoice':invnum},{$set: {'payment':option}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.appdeliverychaorders = (req, res) => {
    let option=JSON.parse(JSON.stringify(req.body.appid).replace(/"\s+|\s+"/g,'"'))
    Deliverycha.find({'invoice':option},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.deliverybyname = (req, res) => {
    let option=JSON.parse(JSON.stringify(req.body.title).replace(/"\s+|\s+"/g,'"'))
    Deliverycha.find({'title':option},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.getinvoicedata = (req, res) => {
    let qoutnum=JSON.parse(JSON.stringify(req.body.qoutnum).replace(/"\s+|\s+"/g,'"'))
    Deliverycha.find({'invoice':qoutnum},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}
module.exports.getpdeliverydata = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.foldername).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
   
    Deliverycha.find({'title':archivedata,'status':status},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getactiveuserdelivery = (req, res) => {
    let activedata=JSON.parse(JSON.stringify(req.body.active).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))

    Deliverycha.find({'status':activedata,'operator':operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}


module.exports.getarchiveuserdelivery = (req, res) => {
    let activedata=JSON.parse(JSON.stringify(req.body.archived).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))

    Deliverycha.find({'status':activedata,'operator':operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getdeliveryfolderuser = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.foldername).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))
   
    Deliverycha.find({'title':archivedata,'status':status,"operator":operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.individualdelivery = (req, res) => {
    let mail=JSON.parse(JSON.stringify(req.body.quotnum).replace(/"\s+|\s+"/g,'"'))
    Deliverycha.find({'invoice':mail,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.clientDchallan = (req, res) => {
    let mail=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    Deliverycha.find({'email':mail,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
} 