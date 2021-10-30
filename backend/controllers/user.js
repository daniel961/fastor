const User = require("../models/user");
const passwordValidator = require("password-validator");

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
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (user) {
      const token = await user.generateAuthToken();
      const completeRegisteration = await user.checkForRegisterCompletion(
        user._id
      );
      res.status(200).send({ token, completeRegisteration });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).send("אימייל או  סיסמה לא תקינים");
  }
};

const registerUser = async (req, res) => {
  const body = req.body;

  try {
    if (!passwordSchema.validate(body.password)) {
      throw "הסיסמה חייבת להכיל לפחות 6 תווים, ספרה אחת וסימן מיוחד אחד (לדוגמה סימן קריאה  סולמית וכו׳)";
    }

    const user = new User(body);
    await user.save();
    if (user) {
      const token = await user.generateAuthToken();

      res.status(200).send({ token });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send("מייל קיים במערכת. נא לנסות מייל אחר");
    }

    res.status(400).send(err);
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};
