const express = require('express');
const router = express.Router();
const mutualFollowersController = require('../Controllers/mutualFollowerControllers');

router.get('/:username', mutualFollowersController.findMutualFollowers);

module.exports = router;