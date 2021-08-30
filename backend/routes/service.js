const router = require('express').Router();
const { addService, getServices } = require('../controllers/service');
const auth = require('../middlewares/auth');

router.post('/insert', auth, addService);
router.get('/', auth, getServices);

module.exports = router;
