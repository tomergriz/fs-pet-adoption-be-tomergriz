const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    adoptionStatus: { type: String, required: true },
    picture: { type: String, required: false },
    height: { type: String, required: false },
    weight: { type: String, required: false },
    color: { type: String, required: false },
    bio: { type: String, required: false },
    hypoallergnic: { type: String, required: false },
    dietery: { type: Array, required: false },
    breed: { type: String, required: false },
});

module.exports = mongoose.model("Pet", petSchema);
