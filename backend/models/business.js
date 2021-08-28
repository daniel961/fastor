const mongoose = require('mongoose');
const validator = require('validator');
const yup = require('yup');
const moment = require('moment');

const Business = new mongoose.Schema({});

const model = mongoose.model('Business', Business);

module.exports = model;
