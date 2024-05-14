/* Roues for authorization */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error when trying to connect to database..');
});


router.post('/register', async(req, res) => {
    try {
        // Get username and password from body
        const {username, password } = req.body;
        let error = '';
        // Validate input
        if(!username) {
            error = 'Invalid input, send username';
            return res.status(400).json({ error });
        }
        if(!password) {
            error = 'Invalid input, send password';
            return res.status(400).json({ error });
        }
        // Succeded call
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async(req, res) => {
    try {
        // Get username and password from body
        const {username, password } = req.body;
        let error = '';
        // Validate input
        if(!username) {
            error = 'Invalid input, send username';
            return res.status(400).json({ error });
        }
        if(!password) {
            error = 'Invalid input, send password';
            return res.status(400).json({ error });
        }

        // Check credentials
        // Check if user exists
        const user = await User.findOne({ username });
        if(!user) {
            error = 'Incorrect username or password'
            return res.status(401).json({ error });
        }
        // Check password
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched) {
            error = 'Invalid input, send password';
            return res.status(400).json({ error });
        } else {
            res.status(200).json({ message: 'User logged in!'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;