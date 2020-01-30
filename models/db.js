const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err) {
        console.log('Connection to MongoDB Successful!!');
    }
    else {
        console.log('Connection to MongoDB failed: '+JSON.stringify(err,undefined,2));
    }
});


require('./device.model');
require('./user.model');