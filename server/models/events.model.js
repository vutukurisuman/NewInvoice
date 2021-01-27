const mongoose = require('mongoose');

var eventsSchema = new mongoose.Schema({
    
    title: {
        type: String,
        
    },
    
    start: {
        type: String,
        
        
    },
    end: {
       
    type:String
      
    },
    primary:{
        type:String
    },
    secondary:{
        type:String
    },
    
    draggable:{
        type: String
    }
});
mongoose.model('Events', eventsSchema);
