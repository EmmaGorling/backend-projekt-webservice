const mongoose = require('mongoose');

// Menu schema
const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ingredients: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;