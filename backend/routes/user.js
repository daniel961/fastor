const router = require('express').Router();
const { loginUser, registerUser, logoutUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', auth, logoutUser);

module.exports = router;
