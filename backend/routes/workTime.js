const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  insertWorkTimes,
  getWorkTimes,
  getWorkTimesExternal,
} = require('../controllers/workTime');

router.post('/insert-work-times', auth, insertWorkTimes);
router.post('/get-work-times-external', getWorkTimesExternal);
router.get('/get-work-times', auth, getWorkTimes);

module.exports = router;
