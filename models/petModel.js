const Pet = require("./petModelMongoose");

async function getAllPetsModel() {
    try {
        const allPets = await Pet.find();
        return allPets;
    } catch (err) {
        console.log(err);
    }
}

async function getSearchedPetsModel(params) {
    const { name, type, adoptionStatus, height, weight } = params;

    try {
        const query = {};
        if (name) query.name = name;
        if (type) query.type = type;
        if (adoptionStatus) query.adoptionStatus = adoptionStatus;
        if (height) query.height = height;
        if (weight) query.weight = weight;
        return await Pet.find(query);
    } catch (err) {
        console.log(err);
    }
}

async function getPetByIdModel(petId) {
    try {
        const pet = await Pet.find({ _id: petId });
        return pet;
    } catch (err) {
        console.log(err);
    }
}

// for (let key in req.query) {
//   req.query.height = { $lte: Number(minHeight), $gte: Number(maxHeight) };
//   req.query.weight = { $lte: Number(minHight), $gte: Number(maxWeight) };
//   req.query.name = { $regex: name, $options: 'i' };
//   if (req.query[key] === '' || req.query[key] === 'Any') {
//     delete req.query[key];
//   }
// }
// };

// async function getUserByEmailModel(id) {
//   try {
//       const user = await User.findOne({ id: id });
//       return user;
//   } catch (err) {
//     console.log(err);
//   }
// }

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

module.exports = { getAllPetsModel, getSearchedPetsModel, getPetByIdModel };
