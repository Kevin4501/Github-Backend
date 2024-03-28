const mutFollService = require('../Services/mutFollService');

async function findMutualFollowers(req, res) {
    const { username } = req.params;

    try {
        const mutualFollowers = await mutFollService.findMutualFollowers(username);
        res.json(mutualFollowers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    findMutualFollowers
};