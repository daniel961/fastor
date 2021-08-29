const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getBusinessInformation,
  addBusinessInformation,
} = require('../controllers/business');

router.get('/information', auth, getBusinessInformation);
router.post('/add-business', auth, addBusinessInformation);

module.exports = router;
