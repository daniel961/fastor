const mongoose = require('mongoose');
const validator = require('validator');
const yup = require('yup');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  phone: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      const phoneSchema = yup
        .string()
        .matches(
          /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/,
          'Password must contain at least 8 characters, one uppercase, one number and one special case character',
        );

      phoneSchema.isValid(value).then(valid => {
        if (!valid) {
          throw new Error('מספר הטלפון לא  תקין');
        }
      });
    },
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
