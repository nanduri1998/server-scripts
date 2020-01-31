const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlDevice = require('../controllers/device.controller');

const jwtHelper = require('../config/jwtHelper');

//For getting and posting user profile values

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

//For getting and posting device values
router.post('/device',ctrlDevice.send_data);
router.get('/device/:deviceId',ctrlDevice.get_data);

module.exports = router;