const mongoose = require('mongoose');
const Device = mongoose.model('device_collection');

module.exports.send_data =(req,res) => {
    var device = new Device();
    device.device_id = req.body.device_id;
    device.pH_val = req.body.pH_val;
    device.DO_val = req.body.DO_val;
    device.temp_val = req.body.temp_val;
    device.timestamp = new Date.now()
    device.save((err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            return err;
        }
    });
}

module.exports.get_data = (req, res) => {
    var deviceId = req.params.deviceId
    var device = new Device()
    device.find({device_id: deviceId}).sort({timestamp: -1}).limit(10)
}