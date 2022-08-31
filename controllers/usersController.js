const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const {
    getAllUsersModel,
    signUpModel,
    getUserByEmailModel,
    deleteUserModel,
} = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newUser = require("../models/userModelMongoose");

async function signUp(req, res, next) {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        const createUser = new newUser({
            email,
            password,
            firstName,
            lastName,
            phone,
            date: Date.now(),
        });

        const user = await createUser.save();
        if (user) {
            console.log("res user", user);
            res.send(user);
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.message || "Error creating user");
        next(err);
    }
}

async function getAllUsers(req, res) {
    try {
        const allUsers = await getAllUsersModel();
        res.send(allUsers);
        return allUsers;
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.message || "Error getting users");
    }
}

function login(req, res) {
    try {
        const { user } = req.body;
        const token = jwt.sign({ id: user._Id }, process.env.TOKEN_SECRET, {
            expiresIn: "2h",
        });
        res.send({
            token: token,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.message || "Error login user");
    }
}

function logout(req, res) {
    try {
        if (req.cookies.token) {
            res.clearCookie("token");
            res.send({ ok: true });
        } else {
            throw new Error("No cookie to clear");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.message || "error clearing user");
    }
}

// async function deleteNote(req, res) {
//   try {
//     const {noteId} = req.params
//     console.log(noteId);
//     const deletedNote =  deleteNoteModel(noteId)
//     if(deletedNote) {
//       res.send({ok: true, deletedNote: noteId, message: 'Note Deleted'});
//       return
//     }

//   } catch (err) {
//     console.log(err)
//     res.status(500).send(err);
//   }
// }

module.exports = {
    signUp,
    login,
    getAllUsers,
    logout /*, getAllNotes, , deleteNote*/,
};
