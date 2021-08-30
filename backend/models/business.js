const mongoose = require('mongoose');

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
