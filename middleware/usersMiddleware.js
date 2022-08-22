const { getUserByEmailModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

async function isNewUser(req, res, next) {
    const user = await getUserByEmailModel(req.body.email);
    if (user) {
        res.status(400).send("User Already Exists");
        return;
    }
    next();
}

function passwordsMatch(req, res, next) {
    if (req.body.password !== req.body.rePassword) {
        res.status(400).send("Passwords don't match");
        return;
    }
    next();
}

function hashPwd(req, res, next) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        req.body.password = hash;
        next();
    });
}

async function isExistingUser(req, res, next) {

    console.log('userd', req.body);

    const user = await getUserByEmailModel(req.body.email);
    if (user) {
      req.body.user = user;
      next();
      return;
    }
    res.status(400).send("User with this email does not exist");
}

  async function verifyPwd(req, res, next) {
    const { user } = req.body;
  
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (result) {
        next();
        return;
      } else {
        res.status(400).send("Incorrrect Password!");
      }
    });
  }

module.exports = { isNewUser, passwordsMatch, hashPwd, isExistingUser };
