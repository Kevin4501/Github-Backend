const axios = require('axios');
const User = require('../Models/UserModel');

async function fetchUserDetails(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const userData = response.data;
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        return await User.findOne({ username });
    } catch (error) {
        throw error;
    }
}
async function searchUsers(criteria) {
    try {
        const query = {};
        if (criteria.username) {
            query.username = { $regex: new RegExp(criteria.username, 'i') };
        }
        if (criteria.location) {
            query.location = { $regex: new RegExp(criteria.location, 'i') };
        }
        // Add more criteria as needed
        
        const users = await User.find(query);
        return users;
    } catch (error) {
        throw error;
    }
}

async function softDeleteUser(username) {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        user.isDeleted = true;
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}
async function updateUser(username, updatedFields) {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        
        // Update user fields
        for (const key in updatedFields) {
            if (updatedFields.hasOwnProperty(key)) {
                user[key] = updatedFields[key];
            }
        }
        
        // Save updated user
        await user.save();
        
        return user;
    } catch (error) {
        throw error;
    }
}
async function listUsers(sortBy) {
    try {
        let sortQuery = {};
        
        // Check for sorting field
        if (sortBy) {
            sortQuery[sortBy] = 1; // 1 for ascending order, -1 for descending
        }

        // Fetch users from the database and apply sorting
        const users = await User.find({ isDeleted: false }).sort(sortQuery);
        
        return users;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    fetchUserDetails,
    getUserByUsername,
    searchUsers,
    softDeleteUser,
    updateUser,
    listUsers
};
