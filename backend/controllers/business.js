const Business = require('../models/business');

const getBusinessInformation = async (req, res) => {
  const userId = req.body.userId;

  try {
    const businessInformation = await Business.findOne({ userId });
    res.send({ businessInformation });
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
