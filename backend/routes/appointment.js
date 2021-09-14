const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  insertAppointmentFromCalendar,
  insertAppointmentFromLandingPage,
  getAvailableHoursExternal,
} = require('../controllers/appointment');

router.post('/insert', insertAppointmentFromLandingPage);
router.post('/insert-internal', auth, insertAppointmentFromCalendar);
router.post('/available-times-external', getAvailableHoursExternal);

module.exports = router;
