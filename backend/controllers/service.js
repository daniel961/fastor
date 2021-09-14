const Service = require('../models/service');

const addServices = async (req, res) => {
  const userId = req.user._id;
  const servicesBody = req.body.services;

  try {
    const services = await Service.findOne({ userId });

    if (!services) {
      const services = new Service({
        services: servicesBody,
        userId,
      });

      await services.save();
      res.send();
    } else {
      await Service.updateOne(
        { userId },
        {
          services: servicesBody,
          userId,
        },
      );

      res.status(200).send();
    }
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

const getServicesExternal = async (req, res) => {
  const userId = req.body.userId;

  try {
    const services = await Service.find({ userId });
    res.send(services);
  } catch (err) {
    res.status(400).send();
  }
};

module.exports = {
  addServices,
  getServices,
  getServicesExternal,
};
