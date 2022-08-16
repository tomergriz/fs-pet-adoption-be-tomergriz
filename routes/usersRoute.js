const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const { doesEmailExist, passwordsMatch } = require("../middleware/usersMiddleware");

const { validateBody } = require("../middleware/validateBody");

const { signUpSchema } = require("../schemas/allSchemas");

router.post('/signup', validateBody(signUpSchema) , doesEmailExist, passwordsMatch , UsersController.signUp);
// router.post('/login', validateBody(loginSchema), doesEmailExist, UsersController.login)
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
