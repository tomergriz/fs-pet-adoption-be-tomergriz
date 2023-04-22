const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    type: { type: String, required: true, default: 'Dog' },
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
    userSaved: { type: String },
    adopt: { type: Array },
    foster: { type: Array },
    userId: { type: String },
},
{ timestamps: true },
);

module.exports = mongoose.model("Pet", petSchema);