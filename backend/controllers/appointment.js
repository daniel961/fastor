const Appointment = require('../models/appointment');
const WorkTime = require('../models/workTime');
const Service = require('../models/service');
const moment = require('moment');

const getAppointments = async (req, res) => {
  const { userId, phone } = req.body;

  try {
    const appointments = await Appointment.find({ userId, phone });
    res.send(appointments);
  } catch (e) {}
};

const insertAppointmentFromLandingPage = async (req, res) => {
  const { fullName, date, service, time, phone, userId } = req.body;
  const { serviceId, serviceName } = service;
  const dayOfWeek = moment(date).format('dddd');
  let workFrom;
  let workTo;
  let workingDays = [];
  let isAppointmentAvailable = true;

  try {
    const workTimes = await WorkTime.find({ userId });
    const currentAppointments = await Appointment.find({
      userId,
      date: {
        $gte: moment(date).startOf('day').toDate(),
        $lte: moment(date).endOf('day').toDate(),
      },
    });
    const services = await Service.findOne({ userId });
    const service = services.services.find(
      ({ _id }) => _id.toString() === serviceId,
    );
    const serviceDuration = moment
      .duration(service.duration, 'minutes')
      .asMinutes();

    const appointmentTime = {
      from: time.from,
      to: moment(time.from, 'HH:mm')
        .add(serviceDuration.toString(), 'minutes')
        .format('HH:mm'),
    };

    // TODO: Extract to function
    // get working times (from, to)
    workTimes.forEach(workTime => {
      workTime.activityTimes.forEach(activity => {
        if (activity.days[0]) {
          workingDays.push(activity.days[0]);
        }

        if (activity.days[0] === dayOfWeek.toLowerCase()) {
          workFrom = activity.workingHours.from;
          workTo = activity.workingHours.to;
        }
      });
    });

    // TODO: Extract to function
    // 1. Check if hours is make sense (between working hours)
    const appointmentFrom = moment(appointmentTime.from, 'HH:mm');
    const appointmentTo = moment(appointmentTime.to, 'HH:mm');
    const isValidAppointmentTimes =
      appointmentFrom.isSameOrAfter(moment(workFrom, 'HH:mm')) &&
      appointmentTo.isSameOrBefore(moment(workTo, 'HH:mm'));

    // 2. The business working in the selected date
    const isWorkingDay = workingDays.includes(dayOfWeek.toLowerCase());

    // TODO: Extract to function
    // 3. Check if there is another appointment in those hours
    if (currentAppointments.length > 0) {
      currentAppointments.forEach(appointment => {
        const { from, to } = appointment.time;
        const existingTimeFrom = moment(from, 'HH:mm');
        const existingTimeTo = moment(to, 'HH:mm');

        const wantedTimeFrom = moment(appointmentTime.from, 'HH:mm');
        const wantedTimeTo = moment(time.to, 'HH:mm');

        if (
          wantedTimeFrom.isAfter(existingTimeFrom, 'hour') &&
          wantedTimeTo.isSameOrBefore(existingTimeTo, 'hour')
        ) {
          isAppointmentAvailable = false;
        }
      });
    }

    if (isValidAppointmentTimes && isWorkingDay && isAppointmentAvailable) {
      const appointment = await Appointment.create({
        fullName,
        date,
        service: {
          serviceId,
          serviceName,
        },
        time: appointmentTime,
        userId,
        phone,
      });

      if (appointment) {
        res.send();
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

const insertAppointmentFromCalendar = async (req, res) => {
  const userId = req.user._id;
  const { fullName, date, service, time } = req.body;

  try {
    await Appointment.create({
      fullName,
      date,
      service,
      time,
      userId,
    });
  } catch (err) {}
};

const getAvailableHoursExternal = async (req, res) => {
  const { userId, date, serviceId } = req.body;
  const dayOfWeek = moment(date).format('dddd');
  const optionalAppointments = [];
  const workDays = [];
  let workFrom;
  let workTo;
  let currentWorkingHour;
  let serviceDurationInMinutes;

  try {
    const { services } = await Service.findOne({ userId });
    const workTimes = await WorkTime.find({ userId });
    const currentAppointments = await Appointment.find({
      userId,
      date: {
        $gte: moment(date).startOf('day').toDate(),
        $lte: moment(date).endOf('day').toDate(),
      },
    });

    // get select service duration
    services.forEach(service => {
      if (service._id.toString() === serviceId) {
        const serviceDuration = service.duration;
        const hours = serviceDuration.split(':')[0];
        const minutes = serviceDuration.split(':')[1];
        serviceDurationInMinutes = hours * 60 + Number(minutes);
      }
    });

    // get working times (from, to)
    workTimes.forEach(workTime => {
      workTime.activityTimes.forEach(activity => {
        workDays.push(activity.days[0]);
        if (activity.days[0] === dayOfWeek.toLowerCase()) {
          workFrom = activity.workingHours.from;
          currentWorkingHour = activity.workingHours.from;
          workTo = activity.workingHours.to;
        }
      });
    });

    // TODO: Extract to function
    // set up optional appointments
    while (
      moment(currentWorkingHour, 'HH:mm').format('HH:mm') !==
      moment(workTo, 'HH:mm')
        .subtract(serviceDurationInMinutes - 5, 'minutes')
        .format('HH:mm')
    ) {
      const jumpTo = moment(currentWorkingHour, 'HH:mm')
        .add('5', 'minutes')
        .format('HH:mm');

      optionalAppointments.push({
        from: currentWorkingHour,
        to: jumpTo,
      });
      currentWorkingHour = jumpTo;
    }

    const currentAppointmentsTimes = currentAppointments.map(
      ({ time }) => time,
    );

    const availableHours = optionalAppointments.filter(o => {
      const optionalFrom = moment(o.from, 'HH:mm');
      const optionalTo = moment(o.to, 'HH:mm');

      const check = currentAppointmentsTimes.some(appointment => {
        const appointmentFrom = moment(appointment.from, 'HH:mm').subtract(
          serviceDurationInMinutes - 5,
          'minutes',
        );
        const appointmentTo = moment(appointment.to, 'HH:mm');

        const isBusyHours =
          (optionalFrom.isSame(appointmentFrom) &&
            optionalTo.isSame(appointmentTo)) ||
          (optionalFrom.isSame(appointmentFrom) &&
            optionalTo.isBetween(appointmentFrom, appointmentTo)) ||
          (optionalFrom.isBetween(appointmentFrom, appointmentTo) &&
            optionalTo.isSame(appointmentTo)) ||
          (optionalFrom.isBetween(appointmentFrom, appointmentTo) &&
            optionalTo.isBetween(appointmentFrom, appointmentTo));

        return isBusyHours;
      });

      return !check;
    });

    res.send({ availableHours, workDays });
  } catch (err) {
    console.log(err);
  }
};

const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;

  try {
    await Appointment.findByIdAndRemove({ _id: appointmentId });
    res.send();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  insertAppointmentFromLandingPage,
  insertAppointmentFromCalendar,
  getAvailableHoursExternal,
  getAppointments,
  cancelAppointment,
};
