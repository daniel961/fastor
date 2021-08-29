const Business = require('../models/business');
const User = require('../models/user');

const getBusinessInformation = async (req, res) => {
  const _id = req.user._id;

  try {
    const user = await User.findById({ _id });
    res.send({ user });
  } catch (err) {
    res.status(404).send('לא נמצאו נתונים עבור העסק המבוקש');
  }
};

const addBusinessInformation = async (req, res) => {
  const userId = req.user._id;
  const { name, address } = req.body;

  try {
    const business = new Business({ userId, name, address });
    await business.save();
    res.send('העסק נוסף בהצלחה');
  } catch (err) {
    console.log(err);
    res.status(400).send('אירעה שגיאה בהוספת העסק');
  }
};

module.exports = {
  getBusinessInformation,
  addBusinessInformation,
};
