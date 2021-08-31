const mongoose = require('mongoose');
const yup = require('yup');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
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
  notificationHourBefore: {
    // TODO: Extract to new model
    type: Boolean,
    default: false,
  },
  notificationDayBefore: {
    type: Boolean,
    default: false,
  },
  notificationTwoDaysBefore: {
    type: Boolean,
    default: false,
  },
  useNotifications: {
    type: Boolean,
    default: false,
  },
  landingPageUrl: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

// Set landing page url before new business created
businessSchema.pre('save', async function (next) {
  const business = this;
  business.landingPageUrl = `http://localhost:/appointments/insert/${business.userId}`;
  next();
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
