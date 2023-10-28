const mongoose = require('mongoose');

// Create your User Model

const userSchema = new mongoose.Schema({
    name: String,
    googleId: {
    type: String,
    required: true
    },
    email: String,
    avatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)
