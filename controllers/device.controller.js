const mongoose = require('mongoose');
const Device = mongoose.model('device_collection');

module.exports.send_data =(req,res) => {
    var device = new Device();
    device.device_id = req.body.device_id;
    device.pH_val = req.body.pH_val;
    device.DO_val = req.body.DO_val;
    device.temp_val = req.body.temp_val;
    device.save((err, doc) => {
        if(!err) {
            res.send(doc);
        }
        else {
            return err;
        }
    });
}