require('dotenv').config({path:"src/.env"});
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./Routers/userRouter');
const mutualFollowers = require('./Routers/mutualFollowers');
const getUsers = require("../src/Routers/getUsers")
const deleteUsers = require("./Routers/deleteUsers")
const updateUsers = require("./Routers/updateUsers")
const listUsers = require("./Routers/listUsers")
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });


app.use('/api/save-user', userRouter);
app.use('/api/find-mutual-followers', mutualFollowers);
app.use('/api/search-users', getUsers);
app.use('/api/delete-users', deleteUsers);
app.use("api/update-user" , updateUsers);
app.use("api/list-users" , listUsers)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});