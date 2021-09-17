const WorkTime = require('../models/workTime');

const insertWorkTimes = async (req, res) => {
  const userId = req.user._id;
  const body = req.body;

  try {
    const existingWorkTime = await WorkTime.findOne({ userId });

    if (!existingWorkTime) {
      const workTime = new WorkTime({
        userId,
        activityTimes: body.activityTimes,
      });

      await workTime.save();
      res.send('נוצר בהצלחה');
    } else {
      await WorkTime.updateOne(
        { userId },
        {
          userId,
          activityTimes: body.activityTimes,
        },
      );

      res.status(200).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('משהו השתבש. נסה שוב.');
  }
};

const getWorkTimes = async (req, res) => {
  const userId = req.user._id;

  try {
    const workTimes = await WorkTime.find({ userId });
    res.send(workTimes);
  } catch (err) {
    res.status(400).send();
  }
};

const getWorkTimesExternal = async (req, res) => {
  const { userId } = req.body.userId;

  try {
    const workTimes = await WorkTime.find({ userId });
    res.send(workTimes);
  } catch (err) {
    res.status(400).send();
  }
};

module.exports = {
  insertWorkTimes,
  getWorkTimes,
  getWorkTimesExternal,
};
