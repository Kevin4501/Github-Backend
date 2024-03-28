const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/', userController.listUsers);

module.exports = router;