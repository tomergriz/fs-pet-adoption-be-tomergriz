const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    adoptionStatus: { type: String, default: 'Available'},
    picture: { type: String },
    height: { type: Number },
    weight: { type: Number },
    color: { type: String },
    bio: { type: String },
    hypoallergnic: { type: Boolean,  default: false },
    dietery: { type: Array },
    breed: { type: String },
});

module.exports = mongoose.model("Pet", petSchema);