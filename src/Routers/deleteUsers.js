const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.delete('/:username', userController.softDeleteUser);

module.exports = router;