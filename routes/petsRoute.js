const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/petsController");
const { validateBody } = require("../Middleware/validateBody");
const { addPetSchema } = require("../schemas/allSchemas");
const { Auth } = require("../Middleware/usersMiddleware");
const { filterBody } = require("../Middleware/PetsMiddleware");

// const { filterSearch } = require ('../middleware/petsMiddleware');
// const { upload, uploadToCloudinary } = require ('../middleware/imagesMiddleware'); */

router.get("/search", filterBody, PetsController.getSearchedPetsController);
router.post("/pet", validateBody(addPetSchema), PetsController.addPet);
router.get("/all", PetsController.getAllPets);
router.get("/:petId", PetsController.getPetByIdController);
router.put("/:petId/save", Auth, PetsController.savePet);

router.get("/", /*veryToken, filterSearch,*/ PetsController.getSearchedPetsController);
// router.get("/mypets/:userId", PetsController.getMyPets);
// router.post("/:petId/adopt", Auth, PetsController.adoptFosterController);

// router.post('/add', upload.single('picture'), uploadToCloudinary, Auth, PetsController)

module.exports = router;
