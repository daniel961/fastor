const express = require("express");
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/user");
const businessRouter = require("./routes/business");
const workTimeRouter = require("./routes/workTime");
const serviceRouter = require("./routes/service");
const otpRouter = require("./routes/otp");
const appointmentRouter = require("./routes/appointment");
require("./db/dbcon");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.use("/users", userRouter);
app.use("/business", businessRouter);
app.use("/business", workTimeRouter);
app.use("/service", serviceRouter);
app.use("/otp", otpRouter);
app.use("/appointment", appointmentRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`---- APP LISTENING AT PORT ${PORT} ------`);
});
