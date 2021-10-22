const { Router } = require('express');
const { register,sign_in,loginRequired } = require('../controllers/userController');
const router = Router();


router.post('/register',register);
router.post('/sign_in',sign_in);
router.post('/loginRequired',loginRequired);

module.exports = router;