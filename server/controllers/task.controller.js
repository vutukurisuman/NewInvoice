const mongoose = require('mongoose');


const Task = mongoose.model('Task');

module.exports.newtask = (req, res, next) => {
    var task = new Task();
    task.name = req.body.name;
    task.descp = req.body.descp;
    task.complt = req.body.complt;
    task.save((err, doc) => {
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

module.exports.complttask = (req, res) => {
    Task.find({'complt':"true" },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.getnewtask = (req, res) => {
    Task.find({'complt':""},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.editingdata = (req, res) => {
    let invnum=JSON.parse(JSON.stringify(req.body.name).replace(/"\s+|\s+"/g,'"'))
  console.log("dcd",invnum)
    Task.find({'name':invnum },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}

module.exports.deletedata = (req, res) => {
    let invnum=JSON.parse(JSON.stringify(req.body.name).replace(/"\s+|\s+"/g,'"'))
  console.log("dcd",invnum)
    Task.remove({'name':invnum },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
}
