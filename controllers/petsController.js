const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");
const {
    getAllPetsModel,
    // getAllUsersModel,
    // signUpModel,
    // getUserByEmailModel,
    // deleteUserModel,
} = require("../models/petModel");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

const newPet = require("../models/petModelMongoose");


async function addPet(req, res, next) {
    try {
        const { type, name, adoptionStatus, picture, height, weight, color, bio, hypoallergnic, dietery, breed} = req.body;
        const createPet = new newPet ({type, name, adoptionStatus, picture, height, weight, color, bio, hypoallergnic, dietery, breed, date: Date.now()
        })

        const pet = await createPet.save();
        if (pet) {
            res.send(pet);
            console.log("res pet", pet);
            return;

        }
        } catch (err) {
            // res.status(500).send(err?.message || "Error saving pet");
            res.err;
            console.log(err);
            next(err);
        }
}

async function getAllPets(req, res) {
    try {
        const allPets = await getAllPetsModel();
        console.log("allPetsControl", allPets);
        res.send(allPets);
        return allPets;
    } catch (err) {
        res.status(500).send(err?.message || "Error getting pets");
        console.log('allPetsControl err', err);
    }
}

    // try {
    //     const { email, password, firstName, lastName, phone } = req.body;
    //     const createUser = new newUser({
    //         email,
    //         password,
    //         firstName,
    //         lastName,
    //         phone,
    //         date: Date.now(),
    //     });

    //     const user = await createUser.save();
    //     if (user) {
    //         res.send(user);
    //         console.log("res.send", user);
    //         return;
    //     }
    // } catch (err) {
    //     res.status(500).send(err);
    //     next(err);
    // }


module.exports = { addPet, getAllPets };
