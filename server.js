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
app.use('/api', authRoutes);

const port = process.env.PORT || 3000;


// Start application
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});