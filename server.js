// Implement the required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error when trying to connect to database..');
});

// Create express-app and implement cors & bodyparser to it
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use the routes from routes-folder
app.use('/admin', authRoutes);
app.use('/menu', menuRoutes);

const port = process.env.PORT || 3000;


// Start application
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});