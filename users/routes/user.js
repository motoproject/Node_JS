let express = require('express');
let router = express.Router();

let UserController = require('../controller/user');

router.post('/register', UserController.POST_REGISTER_USER);

router.post('/login', UserController.POST_LOGIN);

router.delete('/deleteUser/:id', UserController.Delete_USER);

router.post('/logout/:userId', UserController.POST_Logout);

module.exports = router;