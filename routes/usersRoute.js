const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const {
    isNewUser,
    passwordsMatch,
    hashPwd,
    isExistingUser,
    verifyPwd,
} = require("../middleware/usersMiddleware");

const { validateBody } = require("../middleware/validateBody");

const { signUpSchema, loginSchema } = require("../schemas/allSchemas");

router.post(
    "/signup",
    validateBody(signUpSchema),
    isNewUser,
    passwordsMatch,
    hashPwd,
    UsersController.signUp
);

router.post(
    "/login",
    validateBody(loginSchema),
    isExistingUser,
    // verifyPwd,
    UsersController.login
);
// router.post('/', validateBody, verifyToken, UsersController.getCurrentUser)
// router.get('/all', verifyToken, UsersController.getAllUsers)
// router.get('/:userId', verifyToken, UsersController.getUserById)
// router.put('/:userId', verifyToken, UsersController.editUser)

// router.delete("/user/:user", (req, res) => {
//     res.send("Got a DELETE request to path /user/user/:user");
// });

// router.get("/", (req, res) => {
//     res.send("Got a GET request to path /users");
// });

// router.put("/user/:user", (req, res) => {
//     res.send("Got a PUT request to path /user/:user");
// });

module.exports = router;
