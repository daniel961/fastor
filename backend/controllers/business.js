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
  const { name, address, phone } = req.body;

  try {
    const business = await Business.findOne({ userId });

    if (!business) {
      const newBusiness = new Business({
        name,
        address,
        phone,
        userId,
      });

      await newBusiness.save();
    } else {
      await Business.updateOne(
        { userId },
        {
          name,
          address,
          phone,
          userId,
        },
      );

      res.status(200).send();
    }
  } catch (err) {
    res.status(400).send('אחד מהנתונים מהנתונים חסרים');
  }
};

module.exports = {
  getBusinessInformation,
  addBusinessInformation,
};
