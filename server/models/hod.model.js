const mongoose = require('mongoose');


var clientSchema = new mongoose.Schema({
    clientname: {
        type: String,
        required: 'District name can\'t be empty'
    },
    gst: {
        type: String,
        required: 'Department name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        index: {unique: true}   
    },
    phonenumber: {
        type: String,  
    },
    address: {
        type: String,
       
    },
    state: {
        type: String,     
    },
    country: {
        type: String,
        required: 'Password name can\'t be empty'    
    },
    city: {
        type: String,
        required: 'Password name can\'t be empty'    
    },
    postcode: {
        type: String,
        required: 'Password name can\'t be empty'    
    },
    attnto: {
        type: String,
        required: 'password name can\'t be empty'
    },
    qoutlenght: {
        type: String,     
    },
    dchallanlenght: {
        type: String,     
    },
    invoicelenght: {
        type: String,     
    },
    date: {
        type: Date,
        default: Date.now
      }
});

clientSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
   

mongoose.model('Client', clientSchema);