const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const mongoose = require('mongoose');

const Vendordoc = mongoose.model('vendordoc');
// Multer File upload settings
const DIR = '../public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter (req, files, callback) {
    const ext = path.extname(files.originalname);
    const allowed = ['.png', '.jpg', '.jpeg', '.pdf'];
    if (allowed.includes(ext)) {
      callback(null, true);
    } else {
      callback(null, false); // handle error in middleware, not here
    }
  },
});
module.exports.documentvendor = (req, res) => {
    console.log("ddddd", req.body.avatar)

   
    // const today = new Date()
    // var userdoc =new Userdoc();

    const vendordoc = new Vendordoc({
        _id: new mongoose.Types.ObjectId(),
      
        name: req.body.name,
        avatar: req.file.url,
        vendor:req.body.vendor,
        date:req.body.date,
        month:req.body.month,
        year:req.body.year,

      });
   
 

      vendordoc.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
            _id: result._id,
            name: result.name,
            avatar: result.avatar
          }
        })
      }).catch(err => {
        console.log(err),
          res.status(500).json({
            error: err
          });
      })

}


  module.exports.getdocument = (req, res) => {
    Vendordoc.find(function (err, inwarts) {
        if (err) return console.error(err);   
        res.send(inwarts);
    })
}



module.exports.getvendordocs = (req, res) => {
    let folder=JSON.parse(JSON.stringify(req.body.folder).replace(/"\s+|\s+"/g,'"'))

    Vendordoc.find({'vendor':folder},function (err, clients ) {
        if (err)
         return console.error(err); 
         res.send(clients );
     })
}
module.exports.vendormonth = (req, res) => {
    let year=JSON.parse(JSON.stringify(req.body.year).replace(/"\s+|\s+"/g,'"'))
    let vendor=JSON.parse(JSON.stringify(req.body.vendor).replace(/"\s+|\s+"/g,'"'))

    Vendordoc.find({'vendor':vendor,"year":year},function (err, clients ) {
        if (err)
         return console.error(err); 
         res.send(clients );
     })
}

module.exports.vendormonthdocs = (req, res) => {
    let year=JSON.parse(JSON.stringify(req.body.year).replace(/"\s+|\s+"/g,'"'))
    let vendor=JSON.parse(JSON.stringify(req.body.vendor).replace(/"\s+|\s+"/g,'"'))
    let month=JSON.parse(JSON.stringify(req.body.month).replace(/"\s+|\s+"/g,'"'))

    Vendordoc.find({'vendor':vendor,"year":year,"month":month},function (err, clients ) {
        if (err)
         return console.error(err); 
         res.send(clients );
     })
}