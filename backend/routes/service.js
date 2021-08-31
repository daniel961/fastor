const router = require('express').Router();
const { addServices, getServices } = require('../controllers/service');
const auth = require('../middlewares/auth');

router.post('/insert', auth, addServices);
router.get('/', auth, getServices);

module.exports = router;
