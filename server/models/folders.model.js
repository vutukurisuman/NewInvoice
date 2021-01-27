const mongoose = require('mongoose');

var foldersSchema = new mongoose.Schema({
    
    name: {
        type: String,
        
    },
    
});
mongoose.model('Folders', foldersSchema);
