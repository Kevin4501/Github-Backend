const axios = require('axios');
const User = require('../Models/UserModel');
const MutualFollowers = require('../Models/mutualModels');

async function findMutualFollowers(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/followers`);
        const followers = response.data.map(follower => follower.login);

        const followingResponse = await axios.get(`https://api.github.com/users/${username}/following`);
        const following = followingResponse.data.map(following => following.login);

        const mutualFollowers = followers.filter(follower => following.includes(follower));

        const user = await User.findOne({ username });

        for (const mutualFollower of mutualFollowers) {
            const friend = await User.findOne({ username: mutualFollower });
            if (friend) {
                const friendship = new MutualFollowers({ user1: user._id, user2: friend._id });
                await friendship.save();
            }
        }

        return mutualFollowers;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findMutualFollowers
};