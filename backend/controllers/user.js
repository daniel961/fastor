const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(6)
  .is()
  .max(20)
  .has()
  .digits(1)
  .has()
  .symbols()
  .has()
  .not()
  .spaces();

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );

      if (validPassword) {
        const token = jwt.sign(
          { email: req.body.email },
          process.env.TOKEN_SECRET,
          { expiresIn: '365d' },
        );

        res.status(200).send({ token });
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).send('אימייל או  סיסמה לא תקינים');
  }
};

const registerUser = async (req, res) => {
  const body = req.body;

  try {
    if (!passwordSchema.validate(body.password)) {
      throw 'הסיסמה חייבת להכיל לפחות 6 תווים, ספרה אחת וסימן מיוחד אחד (לדוגמה סימן קריאה  סולמית וכו׳)';
    }

    const hashedPassword = await bcrypt.hash(body.password, 8);

    const newUser = await User.create({
      email: body.email,
      password: hashedPassword,
      phone: body.phone,
    });

    if (newUser) {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.TOKEN_SECRET,
        { expiresIn: '365d' },
      );

      res.status(200).send({ token });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send('מייל קיים במערכת. נא לנסות מייל אחר');
    }

    res.status(400).send(err);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
