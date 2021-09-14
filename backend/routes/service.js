const router = require('express').Router();
const {
  addServices,
  getServices,
  getServicesExternal,
} = require('../controllers/service');
const auth = require('../middlewares/auth');

router.post('/insert', auth, addServices);
router.get('/', auth, getServices);
router.post('/get-services', getServicesExternal);

module.exports = router;
