const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: Number },
    isAdmin: { type: Boolean, default: false },
    id: { type: Number },
    saved: { type: Array, default: [] },
});

module.exports = mongoose.model("User", userSchema);
