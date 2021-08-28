const express = require('express');
const cors = require('cors');
const path = require('path');
require('./db/dbcon');
const User = require('./models/user');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`---- APP LISTENING AT PORT ${PORT} ------`);
});
