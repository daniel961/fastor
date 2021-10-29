const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let MONGODB_URI;

switch (process.env.NODE_ENV) {
  case "development":
    MONGODB_URI = "mongodb://localhost/fastor-dev";
    break;
  case "test":
    MONGODB_URI = "mongodb://localhost/fastor-autotest";
    break;
  default:
    MONGODB_URI = process.env.MONGODB_URI;
    break;
}

module.exports = mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`Connected to ${process.env.NODE_ENV} database`);
  })
  .catch((err) => {
    console.log("******* ERROR:", err);
  });
