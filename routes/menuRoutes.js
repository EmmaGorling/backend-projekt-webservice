const express = require('express');
const ruoter = express.Router();
const mongoose = require('mongoose');
const Dish = require('../models/Dish');
require('dotenv').config();


// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error when trying to connect to database..');
});
