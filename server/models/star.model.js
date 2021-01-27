const mongoose = require('mongoose');

var starSchema = new mongoose.Schema({
    
    title: {
        type: String,
        
    },
    category: {
        type: String,
        
    },
    
    created: {
        
        year: String,
        month:String,
        day:String,
    },
    vat:{
        type:String
    },
    
    paymentbank: {
        type: String
    },
    comments: {
        type: String
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
    folder:{
        type:String
    },


});
mongoose.model('Star', starSchema);
