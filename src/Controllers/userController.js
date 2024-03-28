const userService = require('../Services/userService');

async function saveUserDetails(req, res) {
    const { username } = req.params;

    try {
        let user = await userService.getUserByUsername(username);
        if (!user) {
            user = await userService.fetchUserDetails(username);
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function searchUsers(req, res) {
    const { username, location } = req.query;

    try {
        const criteria = {
            username,
            location
            
        };
        const users = await userService.searchUsers(criteria);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function softDeleteUser(req, res) {
    const { username } = req.params;

    try {
        const deletedUser = await userService.softDeleteUser(username);
        res.json({ message: 'User soft deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function updateUser(req, res) {
    const { username } = req.params;
    const updatedFields = req.body;

    try {
        const updatedUser = await userService.updateUser(username, updatedFields);
        res.json({ message: 'User details updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function listUsers(req, res) {
    const { sortBy } = req.query;

    try {
        const users = await userService.listUsers(sortBy);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    saveUserDetails,
    searchUsers,
    softDeleteUser,updateUser,listUsers
};