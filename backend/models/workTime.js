const mongoose = require('mongoose');

const workTimeSchema = new mongoose.Schema({
  activityTimes: [
    // TODO: Validate specific days & only one workingHours object per group
    // In addition, check if data is not empty
    {
      days: [
        {
          type: String,
          required: true,
        },
      ],
      workingHours: {
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const WorkTime = mongoose.model('WorkTime', workTimeSchema);

module.exports = WorkTime;
