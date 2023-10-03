const express = require('express');
const router = express();
const userCtrl = require('../controller/user_auth_ctrl')

router.post('/signUp', userCtrl.register);


router.post('/login', userCtrl.login);

module.exports = router;