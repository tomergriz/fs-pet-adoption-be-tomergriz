const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const {
    isNewUser,
    isEmailValid,
    passwordsValidation,
    hashPwd,
    isExistingUser,
    verifyPwd,
    Auth,
} = require("../middleware/usersMiddleware");
const { validateBody } = require("../middleware/validateBody");
const { signUpSchema, loginSchema } = require("../schemas/allSchemas");
const { isAdmin } = require("../Middleware/AdminMiddleWare");

router.post(
    "/signup",
    validateBody(signUpSchema),
    isNewUser,
    isEmailValid,
    passwordsValidation,
    hashPwd,
    UsersController.signUp
);

router.post(
    "/login",
    validateBody(loginSchema),
    isExistingUser,
    verifyPwd,
    UsersController.login
);

router.get("/logout", UsersController.logout);

router.get("/all", Auth, isAdmin, UsersController.getAllUsers);

router.put("/:userId", Auth, UsersController.editUser);

// router.post('/', validateBody, Auth, UsersController.getCurrentUser)
// router.get('/:userId', Auth, UsersController.getUserById)
// router.put('/:userId', Auth, UsersController.editUser)

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
