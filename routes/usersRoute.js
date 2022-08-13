const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { passwordsMatch, doesUserExist } = require("../middleware/usersMiddleware");

const { validateBody } = require("../middleware/validateBody");

const { signUpSchema } = require("../schemas/allSchemas");


router.post("/signup", validateBody(signUpSchema) , passwordsMatch, doesUserExist, UsersController.signUp);

router.delete("/user/:user", (req, res) => {
    res.send("Got a DELETE request to path /user/user/:user");
});

router.get("/", (req, res) => {
    res.send("Got a GET request to path /users");
});


router.put("/user/:user", (req, res) => {
    res.send("Got a PUT request to path /user/:user");
});

module.exports = router;
