const router = require('express').Router();
const auth = require('../middlewares/auth');
const { insertWorkTimes, getWorkTimes } = require('../controllers/workTime');

router.post('/insert-work-times', auth, insertWorkTimes);
router.get('/get-work-times', auth, getWorkTimes);

module.exports = router;
