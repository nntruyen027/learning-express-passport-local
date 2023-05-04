const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    role: Number
});

UserSchema.methods.verifyPassword = function (password) {
    return password == this.password;
};

module.exports = mongoose.model('User', UserSchema);

