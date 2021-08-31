const mongoose = require('mongoose');
const validator = require('validator');
const yup = require('yup');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Business = require('./business');
const Service = require('./service');
const WorkTime = require('./workTime');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      const isValidEmail = validator.isEmail(value);
      if (!isValidEmail) {
        throw new Error('נא להכניס כתובת מייל תקינה');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  trail: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    default: moment().format(),
  },
  endTrailDate: {
    type: String,
    default: moment().add(30, 'days').format(),
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Remove the sensitive data for all the responses that asks for user data
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.TOKEN_SECRET,
    { expiresIn: '365d' },
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('אימייל או סיסמה לא נכונים');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('אימייל או סיסמה לא נכונים');
  }

  return user;
};

userSchema.methods.checkForRegisterCompletion = async userId => {
  const business = await Business.findOne({ userId });
  const services = await Service.findOne({ userId });
  const workingHours = await WorkTime.findOne({ userId });

  if (business && services && workingHours) {
    return true;
  }

  return false;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
