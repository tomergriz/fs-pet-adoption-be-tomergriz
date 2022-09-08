const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/petsController");
const { validateBody } = require("../middleware/validateBody");
const { addPetSchema } = require("../schemas/allSchemas");
const { verifyToken } = require("../middleware/usersMiddleware");

// const { filterSearch } = require ('../middleware/petsMiddleware');
// const { upload, uploadToCloudinary } = require ('../middleware/imagesMiddleware'); */

router.post("/pet", validateBody(addPetSchema), PetsController.addPet);
router.get("/all", /*verifyToken,*/ PetsController.getAllPets);
router.get("/:petId", PetsController.getPetByIdController);
router.put("/:petId/save", verifyToken, PetsController.savePet);

// router.get("/",veryToken, filterSearch, PetsController.getSearchedPetsController);
// router.get("/mypets/:userId", PetsController.getMyPets);
// router.post("/:petId/adopt", verifyToken, PetsController.adoptFosterController);

// router.post('/add', upload.single('picture'), uploadToCloudinary, verifyToken, PetsController)

module.exports = router;
