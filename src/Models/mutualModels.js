const mongoose = require('mongoose');

const mutualFollowerSchema = new mongoose.Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const MutualFollowers = mongoose.model('Friendship', mutualFollowerSchema);

module.exports = MutualFollowers;
