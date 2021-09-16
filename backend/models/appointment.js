const mongoose = require('mongoose');
const moment = require('moment');
const yup = require('yup');

const appointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  service: {
    type: Object,
    required: true,
    trim: true,
  },
  time: {
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      const phoneSchema = yup
        .string()
        .matches(
          /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/,
          '',
        );

      phoneSchema.isValid(value).then(valid => {
        if (!valid) {
          console.log('her');
          throw new Error('מספר הטלפון לא  תקין');
        }
      });
    },
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: moment().format(),
  }, // Will help me to indicates spammers
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
