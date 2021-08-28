const mongoose = require('mongoose');
const validator = require('validator');
const yup = require('yup');
const moment = require('moment');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      const isValidEmail = validator.isEmail(value);
      if (!isValidEmail) {
        throw new Error('נא להכניס כתובת מייל תקינה');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
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
          'Password must contain at least 8 characters, one uppercase, one number and one special case character',
        );

      phoneSchema.isValid(value).then(valid => {
        if (!valid) {
          throw new Error('מספר הטלפון לא  תקין');
        }
      });
    },
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  trail: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    default: moment().format(),
  },
  endTrailDate: {
    type: String,
    default: moment().add(30, 'days').format(),
  },
});

const model = mongoose.model('User', User);

module.exports = model;
