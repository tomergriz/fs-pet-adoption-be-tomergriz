const fs = require("fs");
// const path = require("path");

// const pathToPetsDb = path.resolve(__dirname, "../database/PetsDb.json");

const Pets = require ("./petModelMongoose")


// async function getUserByEmailModel(id) {
//   try {
//       const user = await User.findOne({ id: id });
//       return user;
//   } catch (err) {
//     console.log(err);
//   }
// }

  
  async function getAllPetsModel() {
  try {
    const allPets = await Pets.find();
    return allPets;
  } catch (err) {
    console.log(err);
  }
}


// async function updateUserByEmailModel(email) {
//   try {
//       const user = await User.updateOne({ email: email }, {$set: name: name, password: password, phone: phone});
//       return user;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function deleteUserByEmailModel(email) {
//   try {
//       const user = await User.deleteOne({ email: email });
//       return user;
//   } catch (err) {
//     console.log(err);
//   }
// }


// for (let key in req.query) {
//   req.query.height = { $lte: Number(minHeight), $gte: Number(maxHeight) };
//   req.query.weight = { $lte: Number(minHight), $gte: Number(maxWeight) };
//   req.query.name = { $regex: name, $options: 'i' };
//   if (req.query[key] === '' || req.query[key] === 'Any') {
//     delete req.query[key];
//   }
// }
// };

// petsColletion.find(req.query)

// async function findPetModel(params) {
// try {
//     const user = await User.find({ 
//       name: name,
//        size : size,
//        status : status,
//       });
//     return user;
// } catch (err) {
//   console.log(err);
// }
// }


module.exports = { getAllPetsModel /*,  getUserByEmailModel*/ };
