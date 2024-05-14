const express = require('express');
const router = express.Router();

router.post('/register', async(req, res) => {
    console.log('Register called...');
});

router.post('/login', async(req, res) => {
    console.log('Login called...');
});

module.exports = router;