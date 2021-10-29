// this middleware should be called in the routes main
// adds 2 functions to the response
// res.reply and res.replyError
module.exports = function (req, res, next) {
  res.reply = function (data, status) {
    status = status || 200;
    res.body = typeof data === "string" ? { data } : data;
    res.status(status).json(res.body);
  };

  res.replyError = function (message, status) {
    status = status || message.status || 400;
    const errObj =
      typeof message == "string"
        ? { ErrorCode: "generalErr", ErrorDesc: message }
        : {
            ErrorCode: message.ErrorCode || "generalErr",
            ErrorDesc: message.message || message.ErrorDesc || "Unkown Error",
          };
    res.body = errObj;
    try {
      res.status(status).json(res.body);
    } catch (err) {
      next(err.message);
    }
  };

  next();
};
