const mongoose = require('mongoose');
const yup = require('yup');

const phoneRegex =
  /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

const otpSchema = new mongoose.Schema({
  digits: {
    type: String,
    maxlength: 4,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    async validate(value) {
      const phoneSchema = yup.string().matches(phoneRegex, '');

      const isValid = await phoneSchema.isValid(value);
      if (!isValid) {
        throw new Error('מספר הטלפון לא תקין');
      }
    },
  },
  createdAt: { type: Date, expires: '5m', default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
