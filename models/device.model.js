const mongoose = require('mongoose');
var deviceSchema = new mongoose.Schema({
    device_id: {
        type: String,
        required: [true,'Device ID can\'t be empty']
    },
    pH_val: {
        type: String
    },
    DO_val: {
        type: String
    },
    temp_val: {
        type: String
    },
});

mongoose.model('device_collection',deviceSchema,'device_collections');