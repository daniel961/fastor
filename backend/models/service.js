const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  services: [
    {
      serviceName: {
        type: String,
        required: true,
        trim: true,
      },
      duration: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: String,
        trim: true,
        default: null,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
