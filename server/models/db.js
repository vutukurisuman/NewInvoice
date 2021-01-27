const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./inwart.model');
require('./hod.model');
require('./star.model');
require('./events.model');
require('./tasks.model');
require('./folders.model');
require('./quotation.model');
require('./purchaseorder.model');
require('./delivery-challan.model');
require('./vendorcre.model');
require('./vendordoc');
require('./userlogindetails.model');
require('./message.model');

