const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: Number },
    isAdmin: { type: Boolean, default: false },
    id: { type: Number },
    saved: { type: Array, default: [] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
