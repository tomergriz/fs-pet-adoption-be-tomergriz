const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    phone: { type: Number, required: false },
});



module.exports = mongoose.model('User', userSchema);

