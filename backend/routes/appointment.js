const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  insertAppointmentFromCalendar,
  insertAppointmentFromLandingPage,
  getAvailableHoursExternal,
  getAppointments,
  cancelAppointment,
} = require('../controllers/appointment');

router.post('/insert', insertAppointmentFromLandingPage);
router.post('/insert-internal', auth, insertAppointmentFromCalendar);
router.post('/available-times-external', getAvailableHoursExternal);
router.post('/get-appointments', getAppointments);
router.post('/cancel-appointment', cancelAppointment);

module.exports = router;
