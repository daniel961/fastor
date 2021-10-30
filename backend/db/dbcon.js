const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "/../", ".env") });

let MONGODB_URI;
switch (process.env.NODE_ENV) {
  case "development":
    MONGODB_URI = process.env.DEVMONGODB_URI;
    break;
  case "autotest":
    MONGODB_URI = process.env.TESTMONGODB_URI;
    break;
  default:
    MONGODB_URI = process.env.MONGODB_URI;
    break;
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    if (process.env.NODE_ENV === "development")
      console.log(`Connected to ${process.env.NODE_ENV} database`);
  })
  .catch((err) => {
    console.log("******* ERROR:", err);
  });

module.exports = mongoose;
