// Implement the required packages
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// Create express-app and implement cors & bodyparser to it
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use the routes from authRoutes
app.use('/admin', authRoutes);

const port = process.env.PORT || 3000;

// Protected route
app.get('/admin/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route' });
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

// Start application
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});