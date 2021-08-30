const Service = require('../models/service');
const User = require('../models/user');

const addService = async (req, res) => {
  const userId = req.user._id;

  try {
    const service = new Service({
      ...req.body,
      userId,
    });

    await service.save();
    res.send();
  } catch (err) {
    res.status(400).send();
  }
};

const getServices = async (req, res) => {
  const userId = req.user._id;

  try {
    const services = await Service.find({ userId });
    res.send(services);
  } catch (err) {}
};

module.exports = {
  addService,
  getServices,
};
