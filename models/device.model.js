const mongoose = require('mongoose');
var deviceSchema = new mongoose.Schema({
    device_id: {
        type: String,
        required: [true,'Device ID can\'t be empty']
    },
    pH_val: {
        type: Number
    },
    DO_val: {
        type: Number
    },
    temp_val: {
        type: Number
    },
    timestamp: {
        type: String
    }
});

mongoose.model('device_collection',deviceSchema,'device_collections');