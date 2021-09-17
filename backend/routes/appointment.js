const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  insertAppointmentFromCalendar,
  insertAppointmentFromLandingPage,
  getAvailableHoursExternal,
  getAvailableHoursInternal,
  getAppointments,
  cancelAppointment,
  getAppointmentsBetweenDates,
  insertBlockedAppointment,
} = require('../controllers/appointment');

router.post('/insert', insertAppointmentFromLandingPage);
router.post('/insert-internal', auth, insertAppointmentFromCalendar);
router.post('/available-times-external', getAvailableHoursExternal);
router.post('/available-times-internal', auth, getAvailableHoursInternal);
router.post('/get-appointments', getAppointments);
router.post('/cancel-appointment', cancelAppointment);
router.post('/get-appointments-between', auth, getAppointmentsBetweenDates);
router.post('/insert-blocked-appointment', auth, insertBlockedAppointment);

module.exports = router;
