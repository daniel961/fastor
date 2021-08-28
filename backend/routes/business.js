const router = require('express').Router();
const authenticateToken = require('../middlewares/authentication');
const { getBusinessInformation } = require('../controllers/business');

router.get('/information', authenticateToken, getBusinessInformation);

module.exports = router;
