const express = require('express');

const AuthHandler = require('./auth.handler');

const router = express.Router();

router.post('/signup', AuthHandler.signup);
router.post('/login', AuthHandler.login);
router.post('/refresh', AuthHandler.refresh);
router.post('/logout', AuthHandler.logout);

module.exports = router;
