const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/petsController");
const { validateBody } = require("../middleware/validateBody");
const { addPetSchema } = require("../schemas/allSchemas");
const { Auth } = require("../middleware/usersMiddleware");
const { filterBody } = require("../middleware/PetsMiddleware");
const { isAdmin } = require("../middleware/AdminMiddleWare");
const { upload, uploadToCloudinary } = require("../middleware/ImagesMiddleware");


router.post("/search", filterBody, PetsController.getSearchedPetsController);
router.post("/add", Auth, isAdmin, upload.single('petImage'), uploadToCloudinary, PetsController.addPet);
router.get("/all", PetsController.getAllPets);
router.get("/:petId", PetsController.getPetByIdController);
router.put("/:petId/save", Auth, PetsController.savePet);

// router.get("/mypets/:userId", PetsController.getMyPets);
// router.post("/:petId/adopt", Auth, PetsController.adoptFosterController);

// router.post('/add', upload.single('picture'), uploadToCloudinary, Auth, PetsController)

module.exports = router;
