const { getUserByEmailModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.TOKEN_SECRET;

require("dotenv").config();
const config = require("../config/.env");

async function isNewUser(req, res, next) {
    const user = await getUserByEmailModel(req.body.email);
    if (user) {
        res.status(400).send("User Already Exists");
        return;
    }
    next();
}

function isEmailValid(req, res, next) {
    {
        if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)
        ) {
            next();
            return;
        }
        res.status(400).send("You have entered an invalid email address!");
        return;
    }
}

function passwordsValidation(req, res, next) {
    if (req.body.password !== req.body.rePassword) {
        res.status(400).send("Passwords don't match");
        return;
    }
    let passw = /^(?=.*\d).{4,8}$/;
    if (!req.body.password.match(passw)) {
        res.status(400).send(
            "Password expression. Password must be between 4 and 8 digits long and include at least one numeric digit. examples: 1234 | asdf1234 | asp123"
        );
        return;
    }
    next();
}

function hashPwd(req, res, next) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
            return;
        }
        req.body.password = hash;
        next();
    });
}

async function isExistingUser(req, res, next) {
    const user = await getUserByEmailModel(req.body.email, req.body.password);
    if (user) {
        req.body.user = user;
        next();
        return;
    }
    res.status(400).send("User with this email does not exist");
    return;
}

async function verifyPwd(req, res, next) {
    const { user } = req.body;

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        if (result) {
            next();
            return;
        } else {
            console.log(err);
            res.status(400).send("Incorrect Password!");
        }
    });
}

function Auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: "No token provided." });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err || !decoded) {
            return res
                .status(401)
                .send({ message: "Failed to authenticate token." });
        }
        req.body.userId = decoded.id;
        next();
    });
}

module.exports = {
    // auth,
    isNewUser,
    isEmailValid,
    passwordsValidation,
    hashPwd,
    isExistingUser,
    verifyPwd,
    Auth,
};
