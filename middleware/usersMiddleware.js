const { getUserByEmailModel } = require("../models/userModel");

function passwordsMatch(req, res, next) {
    if (req.body.password === req.body.rePassword) {
        next();
        return;
    }

    res.status(400).send("Password don't match");
}

function doesUserExist(req, res, next) {
    const user = getUserByEmailModel(req.body.email);

    if (user) {
        res.status(400).send("User Already Exists");
        return;
    }

    next();
}

module.exports = { passwordsMatch, doesUserExist };
