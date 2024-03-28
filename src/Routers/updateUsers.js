const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.patch('/:username', userController.updateUser);

module.exports = router;