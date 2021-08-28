const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = (req, res, next) => {
  const accessToken = req.headers['access-token'];
  if (!accessToken) return res.sendStatus(401);

  jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = authenticateToken;
