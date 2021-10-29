if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

process.on("uncaughtException", (exception) => {
  console.log(exception);
});
process.on("unhandledRejection", (rejection) => {
  console.log(rejection);
});

const express = require("express");
const path = require("path");

// load middlewares
const responseFormat = require("./lib/responseFormat");
const cors = require("cors");
// load routes
const userRouter = require("./routes/user");
const businessRouter = require("./routes/business");
const workTimeRouter = require("./routes/workTime");
const serviceRouter = require("./routes/service");
const otpRouter = require("./routes/otp");
const appointmentRouter = require("./routes/appointment");
const monitoring = require("./routes/monitoring");

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(responseFormat);

app.use("/users", userRouter);
app.use("/business", businessRouter);
app.use("/business", workTimeRouter);
app.use("/service", serviceRouter);
app.use("/otp", otpRouter);
app.use("/appointment", appointmentRouter);
app.use("/monitoring", monitoring);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

module.exports = app;
