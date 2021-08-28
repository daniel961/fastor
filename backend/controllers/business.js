const Business = require('../models/business');

const getBusinessInformation = async (req, res) => {
  try {
    const info = await Business.find({});
    if (info.length > 0) {
      return res.send(info);
    }

    throw new Error();
  } catch (err) {
    res.status(404).send('לא נמצאו נתונים עבור העסק המבוקש');
  }
};

module.exports = {
  getBusinessInformation,
};
