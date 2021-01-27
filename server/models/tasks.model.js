const mongoose = require('mongoose');


var taskSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: 'District name can\'t be empty'
    },
    descp: {
        type: String,
        // required: 'Department name can\'t be empty'
    },
    complt: {
        type: String,   
    }   
   
});


mongoose.model('Task', taskSchema);