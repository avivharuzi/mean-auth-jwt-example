const express = require('express');

const UserHandler = require('./user.handler');

const router = express.Router();

router.get('/settings/profile', UserHandler.settingsProfile);

module.exports = router;
