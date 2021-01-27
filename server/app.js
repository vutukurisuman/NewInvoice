require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const Nexmo = require('nexmo');
const rtsIndex = require('./routes/index.router');
const fileUpload = require('express-fileupload');
const fs = require('fs');
// middleware
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));


// Make "public" Folder Publicly Available
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use(fileUpload());

// const uri = "mongodb://localhost:27017/invoiceapp"
// const db = mongoose.createConnection(uri)
// const Schema = mongoose.Schema


// const User = mongoose.model('User');
// const user = new User({ email: 's@gmail.com', phonenumber: 31 })

// db.once('connected', function (err) {
//   if (err) { return console.error(err) }
//   User.create(user, function (err, doc) {
//     if (err) { return console.error(err) }
//     console.log(doc)
//     return db.close()
//   }) 
// })
// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

// mahesh//

