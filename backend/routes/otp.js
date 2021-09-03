const router = require('express').Router();
const { sendOtp, validateOtp } = require('../controllers/otp');

router.post('/send-otp', sendOtp);
router.post('/validate-otp', validateOtp);

module.exports = router;
