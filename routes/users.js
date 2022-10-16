const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controllers');

router.get('/profile',usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.createUser);
router.post('/create-session',usersController.createSession);
router.get('/sign-out',usersController.destroySession);

module.exports = router;