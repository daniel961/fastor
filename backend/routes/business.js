const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getBusinessInformation } = require('../controllers/business');

router.get('/information', auth, getBusinessInformation);

module.exports = router;
