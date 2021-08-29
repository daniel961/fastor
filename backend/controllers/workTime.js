const WorkTime = require('../models/workTime');

const insertWorkTimes = async (req, res) => {
  const userId = req.user._id;
  const body = req.body;

  try {
    const workTime = new WorkTime({
      userId,
      activityTimes: body.activityTimes,
    });

    await workTime.save();
    res.send('עודכן בהצלחה');
  } catch (err) {
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

module.exports = {
  insertWorkTimes,
  getWorkTimes,
};
