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

const getAppointmentsBetweenDates = async (req, res) => {
  const { startWeek, endWeek } = req.body;
  const userId = req.user._id;
  const appointmentsOfWeek = [[], [], [], [], [], [], []];

  try {
    const appointments = await Appointment.find({
      userId,
      date: {
        $gte: moment(startWeek).startOf('day').toDate(),
        $lte: moment(endWeek).endOf('day').toDate(),
      },
    });

    const sortedAppointments = appointments.sort((a, b) => {
      const fromA = moment(a.time.from, 'HH:mm');
      const fromB = moment(b.time.from, 'HH:mm');

      if (fromA.isBefore(fromB)) {
        return -1;
      } else {
        return 1;
      }
    });

    sortedAppointments.forEach(appointment => {
      const appointmentDate = moment(appointment.date);
      const dayIndex = appointmentDate.day() + 1;

      appointmentsOfWeek[dayIndex - 1] = [
        ...appointmentsOfWeek[dayIndex - 1],
        appointment,
      ];
    });

    res.send(appointmentsOfWeek);
  } catch (e) {
    res.status(400).send();
  }
};

const insertAppointmentFromLandingPage = async (req, res) => {
  const { fullName, date, service, time, phone, userId } = req.body;
  const { serviceId, serviceName } = service;
  const dayOfWeek = moment(date).format('dddd');
  let workFrom;
  let workTo;
  let workingDays = [];

  try {
    const workTimes = await WorkTime.find({ userId });

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
    if (isValidAppointmentTimes && isWorkingDay) {
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
  const { fullName, date, service, time, phone } = req.body;
  const userId = req.user._id;
  const { serviceId, serviceName } = service;
  const dayOfWeek = moment(date).format('dddd');
  let workFrom;
  let workTo;
  let workingDays = [];

  try {
    const workTimes = await WorkTime.find({ userId });

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
    if (isValidAppointmentTimes && isWorkingDay) {
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

const getAvailableHoursInternal = async (req, res) => {
  const { date, serviceId } = req.body;
  const userId = req.user._id;
  const dayOfWeek = moment(date).format('dddd');
  const optionalAppointments = [];
  let serviceDurationInMinutes;
  let workFrom;
  let workTo;
  let currentWorkingHour;

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

    res.send({ availableHours });
  } catch (err) {
    console.log(err);
  }
};

const getAvailableHoursExternal = async (req, res) => {
  const { userId, date, serviceId } = req.body;
  const dayOfWeek = moment(date).format('dddd');
  const optionalAppointments = [];
  let workFrom;
  let workTo;
  let currentWorkingHour;

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

    res.send({ availableHours });
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

const insertBlockedAppointment = async (req, res) => {
  const userId = req.user._id;
  const { date, fromTime, toTime } = req.body;

  if (!date || !fromTime || !toTime) {
    res.status(400).send('נא להזין את כל השדות');
  }

  try {
    const currentAppointments = await Appointment.find({
      userId,
      date: {
        $gte: moment(date).startOf('day').toDate(),
        $lte: moment(date).endOf('day').toDate(),
      },
    });

    // TODO: Check if the business work in this specific date (day)
    const workTimes = await WorkTime.find({ userId });
    const dayName = moment(date).format('dddd');

    const isWorkingDay = workTimes[0].activityTimes.some(({ days }) => {
      return days[0] === dayName.toLowerCase();
    });

    if (!isWorkingDay) {
      return res.status(400).send('העסק לא עובד ביום זה');
    }

    // TODO: Check if the fromTime is before toTime
    const fromTimeMoment = moment(fromTime, 'HH:mm');
    const toTimeMoment = moment(toTime, 'HH:mm');
    const isReasonableHoursRange = toTimeMoment.isAfter(fromTimeMoment);

    if (!isReasonableHoursRange) {
      return res.status(400).send('השעות שבחרת לא הגיוניות.');
    }

    // TODO: Check if the business work between those fromTime and toTime
    let businessStartHour;
    let businessEndHour;

    workTimes.forEach(workTime => {
      workTime.activityTimes.forEach(activity => {
        if (activity.days[0] === dayName.toLowerCase()) {
          businessStartHour = activity.workingHours.from;
          businessEndHour = activity.workingHours.to;
        }
      });
    });

    const businessStartMoment = moment(businessStartHour, 'HH:mm');
    const businessEndMoment = moment(businessEndHour, 'HH:mm');

    const isBetweenWorkingHours =
      fromTimeMoment.isSameOrAfter(businessStartMoment) &&
      toTimeMoment.isSameOrBefore(businessEndMoment);

    if (!isBetweenWorkingHours) {
      // TODO: send the working hours in this response
      return res.status(400).send('השעות שבחרת הן לא בין שעות הפעילות');
    }

    // TODO: Check if there is any existing appointment in those hours
    const currentAppointmentsTimes = currentAppointments.map(
      ({ time }) => time,
    );

    const isBusyHours = currentAppointmentsTimes.some(appointment => {
      const appointmentFrom = moment(appointment.from, 'HH:mm');
      const appointmentTo = moment(appointment.to, 'HH:mm');

      const isBusy =
        (fromTimeMoment.isBetween(appointmentFrom, appointmentTo) &&
          toTimeMoment.isBetween(appointmentFrom, appointmentTo)) ||
        (fromTimeMoment.isBefore(appointmentFrom) &&
          toTimeMoment.isBetween(appointmentFrom, appointmentTo)) ||
        (fromTimeMoment.isBetween(appointmentFrom, appointmentTo) &&
          toTimeMoment.isAfter(appointmentTo)) ||
        (fromTimeMoment.isSame(appointmentFrom) &&
          toTimeMoment.isSame(appointmentTo)) ||
        (fromTimeMoment.isSame(appointmentFrom) &&
          toTimeMoment.isBetween(appointmentFrom, appointmentTo)) ||
        (fromTimeMoment.isBetween(appointmentFrom, appointmentTo) &&
          toTimeMoment.isSame(appointmentTo)) ||
        (appointmentFrom.isBetween(fromTimeMoment, toTimeMoment) &&
          appointmentTo.isBetween(fromTimeMoment, toTimeMoment)) ||
        (appointmentFrom.isBefore(fromTimeMoment) &&
          appointmentTo.isBetween(fromTimeMoment, toTimeMoment)) ||
        (appointmentFrom.isBetween(fromTimeMoment, toTimeMoment) &&
          appointmentTo.isAfter(toTimeMoment)) ||
        (appointmentFrom.isSame(fromTimeMoment) &&
          appointmentTo.isSame(toTimeMoment)) ||
        (appointmentFrom.isSame(fromTimeMoment) &&
          appointmentTo.isBetween(fromTimeMoment, toTimeMoment)) ||
        (appointmentFrom.isBetween(fromTimeMoment, toTimeMoment) &&
          appointmentTo.isSame(toTimeMoment));

      return isBusy;
    });

    if (isBusyHours) {
      return res
        .status(400)
        .send(
          'ישנם תורים  חסימות קיימות בשעות שבחרת. לא ניתן לחסום את שעות אלו.',
        );
    }

    const blockedAppointment = await Appointment.create({
      fullName: 'חסימה',
      date,
      service: {},
      phone: '0521234567',
      time: {
        from: fromTime,
        to: toTime,
      },
      userId,
      isBlocked: true,
    });

    if (blockedAppointment) {
      res.send();
    }
  } catch (error) {
    console.log(error);
  }
};

const editAppointment = async (req, res) => {
  const { appointmentId, service, time } = req.body;
  const userId = req.user._id;

  try {
    const services = await Service.findOne({ userId });
    const selectedService = services.services.find(
      ({ _id }) => _id.toString() === service.serviceId,
    );

    const serviceDuration = moment
      .duration(selectedService.duration, 'minutes')
      .asMinutes();

    const appointmentTime = {
      from: time.from,
      to: moment(time.from, 'HH:mm')
        .add(serviceDuration.toString(), 'minutes')
        .format('HH:mm'),
    };

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId },
      {
        ...req.body,
        time: appointmentTime,
      },
    );

    if (updatedAppointment) {
      res.send();
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
};

module.exports = {
  insertAppointmentFromLandingPage,
  insertAppointmentFromCalendar,
  getAvailableHoursExternal,
  getAvailableHoursInternal,
  getAppointments,
  cancelAppointment,
  getAppointmentsBetweenDates,
  insertBlockedAppointment,
  editAppointment,
};
