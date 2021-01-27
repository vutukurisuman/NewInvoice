const mongoose = require('mongoose');

var inwartSchema = new mongoose.Schema({
    invoice: {
        type: String,
        
    },
    title: {
        type: String,
        
    },
    tax: {
        type: String,
      
    },
    email: {
        type: String,
       
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
    },
    city: {
        type: String, 
    },
    model: {
        year: String,
        month:String,
        day:String,
    },
    model1: {
        year: String,
        month:String,
        day:String,
    },  
    itemquan: {
        type: String
    },
    itemname: {
        type: String
    }, 
    itemcost: {
        type: String
    },
    price: {
        type: String
    },

    subtotal: {
        type: String
    }, 
    vatper: {
        type: String
    },
    total: {
        type: String
    },
    payment: {
        type: String
    },
    status: {
        type: String
    },
    paymentbank: {
        type: String
    },
    comments: {
        type: String
    },
    folder: {
        type: String
    },
    operator: {
        type: String
    },
    date:{
        type:Date
    }
});
mongoose.model('Inwart', inwartSchema);
