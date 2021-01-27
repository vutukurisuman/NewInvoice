const mongoose = require('mongoose');
const Client = mongoose.model('Client');


module.exports.clientcre = (req, res) => {
    // console.log("res",req.body);
    
    var hod = new Client();
    hod.clientname = req.body.clientname;
    hod.gst = req.body.gst;
    hod.email = req.body.email;
    hod.phonenumber = req.body.phonenumber;
    hod.state = req.body.state;
    hod.address = req.body.address;
    hod.country = req.body.country;
    hod.city = req.body.city;
    hod.postcode = req.body.postcode;
    hod.attnto = req.body.attnto;
    hod.qoutlenght= req.body.qoutlenght;
    hod.dchallanlenght= req.body.dchallanlenght;
    hod.invoicelenght= req.body.invoicelenght;

    hod.save(function(err) {
        if(!err) 
        res.json({status:`true`,message:`Successfully ${req.body.email } registered`})
    else {
        if (err.name === 'ValidationError' ) {
            var valErrors = [];
            Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
           res.status(422).send(valErrors);
        }
        else if (11000 === err.code || 11001 === err.code) {
            var MongooseError = require('mongoose/lib/error')
            var valError = new MongooseError.ValidationError(err)
            valError.errors["xxx"] = new MongooseError.ValidatorError('xxx', 'Duplicate found', err.err)
            err = valError
            res.json({status:`false`,message:` ${req.body.email } already exists`})
          }
            
    }
       
    });
  
}



//login
module.exports.clientdetails = (req, res) => {
    Client.find(function (err, clients ) {
        if (err)
         return console.error(err); 
         res.send(clients);
     })
}



module.exports.getdet = (req, res) => {
    let name=JSON.parse(JSON.stringify(req.body.name).replace(/"\s+|\s+"/g,'"'))

    Client.find({'clientname':name},function (err, clients ) {
        if (err)
         return console.error(err); 
         res.send(clients );
     })
}
module.exports.hoddata = (req, res) => {

    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))

    Hodoff.find({'gmail':email},function (err, hodoffs ) {
        if (err)
         return console.error(err); 
         res.send(hodoffs);
     })
}

module.exports.hodhead = (req, res) => {
    let dept=JSON.parse(JSON.stringify(req.body.dept).replace(/"\s+|\s+"/g,'"'))
    let dist=JSON.parse(JSON.stringify(req.body.dist).replace(/"\s+|\s+"/g,'"'))
    console.log("ddede",dept);
    
    Hodoff.find({'department':dept,'district':dist},function (err, hodoffs) {
        if (err)
         return console.error(err); 
         res.send(hodoffs);
     })
}


module.exports.updateclientlength = (req, res) => {
    let length=JSON.parse(JSON.stringify(req.body.length).replace(/"\s+|\s+"/g,'"'))
    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    console.log("ddede",email);
    Client.update({'email':email},{$set:{'qoutlenght':length}},function (err, hodoffs) {
        if (err)
         return console.error(err); 
         res.send(hodoffs);
     })
}
module.exports.updatedchallanlength = (req, res) => {
    let length=JSON.parse(JSON.stringify(req.body.length).replace(/"\s+|\s+"/g,'"'))
    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    console.log("ddede",email);
    Client.update({'email':email},{$set:{'dchallanlenght':length}},function (err, hodoffs) {
        if (err)
         return console.error(err); 
         res.send(hodoffs);
     })
}

module.exports.updateinvoicelength = (req, res) => {
    let length=JSON.parse(JSON.stringify(req.body.length).replace(/"\s+|\s+"/g,'"'))
    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    console.log("ddede",email);
    Client.update({'email':email},{$set:{'invoicelenght':length}},function (err, hodoffs) {
        if (err)
         return console.error(err); 
         res.send(hodoffs);
     })
}


module.exports.clientWeekly = (req, res) => {
    var today = new Date();
    var lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1 -7 );
    var lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() -  1);
    var start = new Date(lastWeekStart.setHours(0,0,0,0));
    var end = new Date(lastWeekEnd.setHours(23,59,59,999));
    console.log("start",lastWeekStart);
    console.log("end",lastWeekEnd);
    
    Client.aggregate([
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
    
    module.exports.clientMonth = (req, res) => {
        Client.aggregate(
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
    
      module.exports.clientToday = (req, res) => {
        var today = new Date();
        var lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0 );
        var lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() -  0);
        var start = new Date(lastWeekStart.setHours(0,0,0,0));
        var end = new Date(lastWeekEnd.setHours(23,59,59,999));
        console.log("start",lastWeekStart);
        console.log("end",lastWeekEnd);
        
        Client.aggregate([
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