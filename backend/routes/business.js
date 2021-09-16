const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getBusinessInformation,
  addBusinessInformation,
} = require('../controllers/business');

router.post('/information', auth, getBusinessInformation);
router.post('/external-business-information', getBusinessInformation);
router.post('/add-business', auth, addBusinessInformation);

module.exports = router;
