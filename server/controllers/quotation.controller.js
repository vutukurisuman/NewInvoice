const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quotation = mongoose.model('Quotation');

module.exports.quotpost = (req, res) => {
   var quotation = new Quotation();
    quotation.invoice = req.body.invoice; 
    quotation.title = req.body.title; 
    quotation.tax = req.body.tax;
    quotation.email = req.body.email;
    quotation.phonenumber = req.body.phonenumber;
    quotation.address = req.body.address;
    quotation.state = req.body.state;
    quotation.country = req.body.country;
    quotation.city = req.body.city;
    quotation.model = req.body.model;
    quotation.model1 = req.body.model1;
    quotation.itemquan = req.body.itemquan;
    quotation.itemname = req.body.itemname;
    quotation.itemcost = req.body.itemcost;
    quotation.price = req.body.price;
    quotation.subtotal = req.body.subtotal;
    quotation.vatper = req.body.vatper;
    quotation.total = req.body.total;
    quotation.comments = req.body.comments;
    quotation.paymentbank = req.body.paymentbank;
    quotation.payment ="Pending";
    quotation.status ="Active";
    quotation.folder ="Quotation";
    quotation.operator = req.body.operator; 
    quotation.date = new Date();
    quotation.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return console.error(err); 
        }
    });
}

module.exports.getquotation = (req, res) => {
    Quotation.find(function (err, inwarts) {
        if (err) return console.error(err);   
        res.send(inwarts);
    })
}

module.exports.getactivequotation = (req, res) => {
    let activedata=JSON.parse(JSON.stringify(req.body.active).replace(/"\s+|\s+"/g,'"'))
    Quotation.find({'status':activedata},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.updatequotoption = (req, res) => {
    let option=JSON.parse(JSON.stringify(req.body.option).replace(/"\s+|\s+"/g,'"'))
    let invnum=JSON.parse(JSON.stringify(req.body.invnum).replace(/"\s+|\s+"/g,'"'))
    Quotation.updateMany({'invoice':invnum},{$set: {'payment':option}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.quotchecked = (req, res) => {
    let invnum=JSON.parse(JSON.stringify(req.body.invnum.invnum).replace(/"\s+|\s+"/g,'"'))
    Quotation.updateMany({'invoice':invnum },{$set: {'status':"Archived"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}


module.exports.quotarchonly = (req, res) => {
    Quotation.find({'status':"Archived"},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}


module.exports.getdata = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.foldername).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
   
    Quotation.find({'title':archivedata,'status':status},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getquotdata = (req, res) => {
    let qoutnum=JSON.parse(JSON.stringify(req.body.qoutnum).replace(/"\s+|\s+"/g,'"'))
    Quotation.find({'invoice':qoutnum,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.approvedquot = (req, res) => {
    let payment=JSON.parse(JSON.stringify(req.body.payment).replace(/"\s+|\s+"/g,'"'))
    Quotation.find({'payment':payment,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}


module.exports.pdfdata = (req, res) => {
    let invnm=JSON.parse(JSON.stringify(req.body.invnm).replace(/"\s+|\s+"/g,'"'))
    Quotation.find({'invoice':invnm,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getactiveuserquotation = (req, res) => {
    let activedata=JSON.parse(JSON.stringify(req.body.active).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))

    Quotation.find({'status':activedata,'operator':operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getarchiveuserquotation = (req, res) => {
    let activedata=JSON.parse(JSON.stringify(req.body.archived).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))

    Quotation.find({'status':activedata,'operator':operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}

module.exports.getquotationfolderuser = (req, res) => {
    let archivedata=JSON.parse(JSON.stringify(req.body.foldername).replace(/"\s+|\s+"/g,'"'))
    let status=JSON.parse(JSON.stringify(req.body.status).replace(/"\s+|\s+"/g,'"'))
    let operator=JSON.parse(JSON.stringify(req.body.operator).replace(/"\s+|\s+"/g,'"'))
   
    Quotation.find({'title':archivedata,'status':status,"operator":operator},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}


module.exports.userquotation = (req, res) => {
    let mail=JSON.parse(JSON.stringify(req.body.mail).replace(/"\s+|\s+"/g,'"'))
   
   
    Quotation.find({'email':mail,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}
module.exports.individualquot = (req, res) => {
    let mail=JSON.parse(JSON.stringify(req.body.quotnum).replace(/"\s+|\s+"/g,'"'))
    Quotation.find({'invoice':mail,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}
module.exports.employeequotation = (req, res) => {
    let mail=JSON.parse(JSON.stringify(req.body.mail).replace(/"\s+|\s+"/g,'"'))
    Quotation.find({'operator':mail,},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
}


module.exports.quotationweekly = (req, res) => {
var today = new Date();
var lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1 -7 );
var lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() -  1);
var start = new Date(lastWeekStart.setHours(0,0,0,0));
var end = new Date(lastWeekEnd.setHours(23,59,59,999));
console.log("start",lastWeekStart);
console.log("end",lastWeekEnd);

Quotation.aggregate([
    {
        "$group": {
            "_id":"$_id" ,
            "doc":{"$first":"$$ROOT"},
            "total": { "$sum": 1 },
            "usersCreatedLastWeek": {
                "$sum": {
                    "$cond": [
                        { 
                            "$and": [
                                { "$gte": [ "$date", start ] },
                                { "$lte": [ "$date", end ] }
                            ]
                        },
                        1,
                        0
                    ]
                }
            }
        }
    },
    {
        $match: { "usersCreatedLastWeek": { "$gte": 1 } }
      }
],function (err, inwarts) {
    if (err)
     return console.error(err); 
     res.send(inwarts);  
 })
}

module.exports.monthdata = (req, res) => {
    Quotation.aggregate(
        [
            // Stage 1
            {
                $match: {
                    $expr: {$and:[
                      {$eq:[{$year:"$date"},{$year:new Date()}]},
                      {$eq:[1,{$subtract:[{$month:new Date()},{$month:"$date"}]}]},  
                    ]}
                }
            },
    
            // Stage 2
            {
                "$group": {
                    "_id":"$_id" ,
                    "doc":{"$first":"$$ROOT"},
                    "total": { "$sum": 1 },
                    
                }
            },
        ],function (err, inwarts) {
            if (err)
             return console.error(err); 
             res.send(inwarts);
         })
    
    
  }

  module.exports.today = (req, res) => {
    var today = new Date();
    var lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0 );
    var lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() -  0);
    var start = new Date(lastWeekStart.setHours(0,0,0,0));
    var end = new Date(lastWeekEnd.setHours(23,59,59,999));
    console.log("start",lastWeekStart);
    console.log("end",lastWeekEnd);
    
    Quotation.aggregate([
        {
            "$group": {
                "_id":"$_id" ,
                "doc":{"$first":"$$ROOT"},
                "total": { "$sum": 1 },
                "usersCreatedLastWeek": {
                    "$sum": {
                        "$cond": [
                            { 
                                "$and": [
                                    { "$gte": [ "$date", start ] },
                                    { "$lte": [ "$date", end ] }
                                ]
                            },
                            1,
                            0
                        ]
                    }
                }
            }
        },
        {
            $match: { "usersCreatedLastWeek": { "$gte": 1 } }
          }
    ],function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);  
     })
    }


    module.exports.clientquots = (req, res) => {
        let mail=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
        Quotation.find({'email':mail,},function (err, inwarts) {
            if (err)
             return console.error(err); 
             res.send(inwarts);  
         })
    }   