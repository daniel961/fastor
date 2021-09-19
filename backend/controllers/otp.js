const OTP = require('../models/otp');
const otpGenerator = require('otp-generator');
const axios = require('axios');

// TODO: Extract this sendSms function to schema methods
const sendSms = (to, digits) =>
  new Promise(async (resolve, reject) => {
    const body = `<?xml version="1.0" encoding="UTF-8"?> 
      <sms> 
      <user>  
      <username>netanel1</username>  
      <password>Mishmish1!</password> 
      </user>  
      <source>Fastor</source> 
      <destinations> 
      <phone>${to}</phone> 
      </destinations> 
      <message>היי :) זה קוד האימות שלך: ${digits} בהצלחה מ- Fastor</message>  
      <response>0</response> 
      </sms> 
      `;

    const config = {
      headers: {
        'Content-Type': 'text/xml',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };

    try {
      const res = await axios.post(
        'https://www.019sms.co.il:8090/api',
        body,
        config,
      );

      if (res.data.status !== 0) {
        reject('אירעה שגיאה בעת שליחת קוד האימות');
      }

      resolve();
    } catch (err) {
      reject('אירעה שגיאה בעת שליחת קוד האימות');
    }
  });

const sendOtp = async (req, res) => {
  const { userId, phone } = req.body;
  const digits = otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(digits);
  }

  try {
    const newOTP = new OTP({
      userId,
      phone,
      digits,
    });

    await newOTP.save();
    if (newOTP) {
      await sendSms(phone, digits);
      res.send();
    } else {
      res.status(400).send();
    }
  } catch (err) {
    res.status(400).send('bad request');
  }
};

const validateOtp = async (req, res) => {
  const { userId, otpCode, customerPhone } = req.body;

  try {
    const otp = await OTP.find({
      digits: otpCode,
      phone: customerPhone,
      userId,
    });

    if (otp.length > 0) {
      res.send();
    } else {
      throw Error();
    }
  } catch (err) {
    res.status(400).send();
  }
};

module.exports = {
  sendOtp,
  validateOtp,
};
