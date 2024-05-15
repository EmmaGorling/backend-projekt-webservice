const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dish = require('../models/Dish');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error when trying to connect to database..');
});

// Get dishes
router.get('/dishes', async(req, res) => {
    try {
        let result = await Dish.find({});
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Add a dish, with auth-token
router.post('/dishes', authenticateToken, async(req, res) => {
    try {
        let result = await Dish.create(req.body);

        return res.json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

// Update a dish, with auth-token
router.put('/dishes/:id', authenticateToken, async(req, res) => {
    try {
        let result = await Dish.updateOne({ _id: req.params.id }, { $set: req.body });
        return res.json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

// Delete a dish with auth-token
router.delete('/dishes/:id', authenticateToken, async(req, res) => {
    try {
        let result = await Dish.deleteOne({ _id: req.params.id });

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});


// Authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) res.status(401).json({ message: 'Not authorized for this route - token is missing!'});
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: 'Invalid JWT' });
        req.username = username;
        next();
    });
}

module.exports = router;