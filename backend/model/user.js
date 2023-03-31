const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    password: { type: String },
    email: { type: String, unique: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    token: { type: String}
})

module.exports = mongoose.model('User', userSchema);