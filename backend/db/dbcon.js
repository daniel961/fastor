const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI =
  process.env.NODE_ENV === 'development'
    ? 'mongodb://localhost/fastor-dev'
    : process.env.MONGODB_URI;

module.exports = mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(res => {
    console.log(`Connected to ${process.env.NODE_ENV} database`);
  })
  .catch(err => {
    console.log('******* ERROR:', err);
  });
