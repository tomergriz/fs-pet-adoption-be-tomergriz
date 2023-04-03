const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const {
    getAllUsersModel,
    editUserModel,
    signUpModel,
    getUserByEmailModel,
    deleteUserModel,
} = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const newUser = require("../models/userModelMongoose");

async function signUp(req, res, next) {
    try {
        const { email, password, firstName, lastName, phone, isAdmin } =
            req.body;
        const createUser = new newUser({
            email,
            password,
            firstName,
            lastName,
            phone,
            isAdmin,
            date: Date.now(),
        });

        const user = await createUser.save();
        if (user) {
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
        const token = jwt.sign(
            { email: user.email },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "15m",
            }
        );
        res.send({
            token: token,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            id: user._id,
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

async function editUser(req, res) {
    try {
        const { userId } = req.params;
        console.log(req.body);
        const user = await editUserModel(userId, req.body);
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.massage);
    }
}


module.exports = {
    signUp,
    login,
    getAllUsers,
    logout,
    editUser,
};
