const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/:username', userController.saveUserDetails);

module.exports = router;