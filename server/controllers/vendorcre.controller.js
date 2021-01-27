const mongoose = require('mongoose');
const Client = mongoose.model('Vendor');


module.exports.vendorcre = (req, res) => {
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
    // hod.attnto = req.body.attnto;

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
module.exports.vendordetails = (req, res) => {
    Client.find(function (err, clients ) {
        if (err)
         return console.error(err); 
         res.send(clients);
     })
}



module.exports.vendorgetdet = (req, res) => {
    let name=JSON.parse(JSON.stringify(req.body.name).replace(/"\s+|\s+"/g,'"'))

    Client.find({'clientname':name},function (err, clients ) {
        if (err)
         return console.error(err); 
         res.send(clients );
     })
}
module.exports.vendordata = (req, res) => {

    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))

    Hodoff.find({'gmail':email},function (err, hodoffs ) {
        if (err)
         return console.error(err); 
         res.send(hodoffs);
     })
}

module.exports.vendorhead = (req, res) => {
    let dept=JSON.parse(JSON.stringify(req.body.dept).replace(/"\s+|\s+"/g,'"'))
    let dist=JSON.parse(JSON.stringify(req.body.dist).replace(/"\s+|\s+"/g,'"'))
    console.log("ddede",dept);
    
    Hodoff.find({'department':dept,'district':dist},function (err, hodoffs) {
        if (err)
         return console.error(err); 
         res.send(hodoffs);
     })
}