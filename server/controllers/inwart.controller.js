
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const Inwart = mongoose.model('Inwart');
const Nexmo = require('nexmo');

module.exports.alldata = (req, res) => {
    var inwart = new Inwart();
    inwart.invoice = req.body.invoice; 
    inwart.title = req.body.title; 
    inwart.tax = req.body.tax;
    inwart.email = req.body.email;
    inwart.phonenumber = req.body.phonenumber;
    inwart.address = req.body.address;
    inwart.state = req.body.state;
    inwart.country = req.body.country;
    inwart.city = req.body.city;
    inwart.model = req.body.model;
    inwart.model1 = req.body.model1;
    inwart.itemquan = req.body.itemquan;
    inwart.itemname = req.body.itemname;
    inwart.itemcost = req.body.itemcost;
    inwart.price = req.body.price;
    inwart.subtotal = req.body.subtotal;
    inwart.vatper = req.body.vatper;
    inwart.total = req.body.total;
    inwart.comments = req.body.comments;
    inwart.paymentbank = req.body.paymentbank;
    inwart.payment ="pending";
    inwart.status ="Active";
    inwart.folder ="";
    inwart.operator = req.body.operator;
    inwart.date = new Date(); 

    inwart.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return console.error(err); 
        }
    });
}

module.exports.getinvoice = (req, res) => {
    Inwart.find(function (err, inwarts) {
        if (err) return console.error(err);   
        res.send(inwarts);
    })
}

module.exports.postfnamei = (req, res) => {
    console.log(req.body)
    let name =JSON.parse(JSON.stringify(req.body.folder).replace(/"\s+|\s+"/g,'"'))
    Inwart.find({'folder':name},function (err, inwarts) {
        if (err) 
        return console.error(err);   
        res.send(inwarts);
    })
}

module.exports.getdatatopdf = (req, res) => {
    console.log(req.body)
    let id =JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    Inwart.find({'_id':id},function (err, inwarts) {
        if (err) 
        return console.error(err);   
        res.send(inwarts);
    })
}

module.exports.updateoption = (req, res) => {
    let option=JSON.parse(JSON.stringify(req.body.option).replace(/"\s+|\s+"/g,'"'))
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))
    Inwart.updateMany({'invoice':invnum},{$set: {'payment':option}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.sendifoldername = (req, res) => {
    console.log(req.body)
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))
    let name=JSON.parse(JSON.stringify(req.body.folder).replace(/"\s+|\s+"/g,'"'))

    Inwart.updateMany({'invoice':invnum},{$set: {'folder':name,'status':"Archived"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.checked = (req, res) => {
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))
    Inwart.find({'invoice':invnum },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.toarchive = (req, res) => {
    let invnum=JSON.parse(JSON.stringify(req.body.ids.invnum).replace(/"\s+|\s+"/g,'"'))
 
    console.log("feef",req.body)
    Inwart.updateMany({'invoice':invnum },{$set: {'status':"Archived"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.getidpdf = (req, res) => {
    console.log(req.body)
    let deptname=JSON.parse(JSON.stringify(req.body.invoice).replace(/"\s+|\s+"/g,'"'))
    Inwart.find({'invoice':deptname},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.getactiveinvoice = (req, res) => {
    let activedata=JSON.parse(JSON.stringify(req.body.active).replace(/"\s+|\s+"/g,'"'))
    Inwart.find({'status':activedata},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getarchiveinvoice = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.archive).replace(/"\s+|\s+"/g,'"'))
    Inwart.find({'status':archivedata},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}


module.exports.getactiveonly = (req, res) => {
    Inwart.find({'status':"Active"},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getarchiveonly = (req, res) => {
    Inwart.find({'status':"Archived"},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}




module.exports.getinvoicefolder = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.foldername).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
   
    Inwart.find({'title':archivedata,'status':status},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getactiveuserinvoice = (req, res) => {
    let activedata=JSON.parse(JSON.stringify(req.body.active).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))

    Inwart.find({'status':activedata,'operator':operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}


module.exports.getarchiveuserinvoice = (req, res) => {
    let activedata=JSON.parse(JSON.stringify(req.body.archived).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))

    Inwart.find({'status':activedata,'operator':operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getinvoicefolderuser = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.foldername).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))
   
    Inwart.find({'title':archivedata,'status':status,"operator":operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.individualinvoice= (req, res) => {
    let mail=JSON.parse(JSON.stringify(req.body.quotnum).replace(/"\s+|\s+"/g,'"'))
    Inwart.find({'invoice':mail,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}
module.exports.clientInvoice = (req, res) => {
    let mail=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    Inwart.find({'email':mail,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
} 