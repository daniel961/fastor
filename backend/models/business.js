const mongoose = require('mongoose');
const validator = require('validator');
const yup = require('yup');
const moment = require('moment');

const businessSchema = new mongoose.Schema({});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
