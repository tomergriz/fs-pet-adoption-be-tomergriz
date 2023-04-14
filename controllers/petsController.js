const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { getAllPetsModel, getPetByIdModel, getSearchedPetsModel } = require("../models/petModel");
const { savePetToUser } = require("../models/userModel");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const newPet = require("../models/petModelMongoose");

async function addPet(req, res, next) {
    try {
        const { type, name, adoptionStatus, picture, height, weight, color, bio, hypoallergnic, dietery, breed } = req.body;
        const createPet = new newPet({
            type,
            name,
            adoptionStatus,
            picture,
            height,
            weight,
            color,
            bio,
            hypoallergnic,
            dietery,
            breed,
            date: Date.now(),
        });

        const pet = await createPet.save();
        if (pet) {
            res.send(pet);
            return;
        }
    } catch (err) {
        res.status(500).send(err?.message || "Error saving pet");
        console.log(err);
        next(err);
    }
}

async function getAllPets(req, res) {
    try {
        const allPets = await getAllPetsModel();
        res.send(allPets);
        return allPets;
    } catch (err) {
        res.status(500).send(err?.message || "Error getting pets");
        console.log("allPetsControl err", err);
    }
}

async function getPetByIdController(req, res) {
    try {
        const { petId } = req.params;
        const pet = await getPetByIdModel(petId);
        res.send(pet);
    } catch (err) {
        res.status(500).send(err?.message || "Error getting pet");
        console.log(err);
    }
}

async function getSearchedPetsController(req, res) {
    try {
        const searchPets = await getSearchedPetsModel(req.body);
        res.send(searchPets);
    } catch (err) {
        res.status(500).send(err?.message || "Error getting pet");
        console.log(err);
    }
}

async function savePet(req, res) {
    try {
        const { petId } = req.params;
        const user = await savePetToUser(req.body.email, petId);
        res.send(user);
    } catch (err) {
        res.status(500).send(err?.message || "Error getting pet");
        console.log(err);
    }
}

module.exports = { addPet, getAllPets, getPetByIdController, getSearchedPetsController, savePet };
