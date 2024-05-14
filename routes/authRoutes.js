/* Roues for authorization */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();



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
        res.status(200).json({ message: 'User created' });
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
        if(username === 'emad' && password === 'password') {
            res.status(200).json({ message: 'Login successful!'});
        } else {
            error = 'Invalid username/password'
            res.status(401).json({ error })
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;