const fs = require("fs");
const path = require("path");

const pathToUsersDb = path.resolve(__dirname, "../database/usersDb.json");

const User = require("./userModelMongoose");

async function getUserByEmailModel(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function getAllUsersModel() {
    try {
        const allUsers = await User.find();
        return allUsers;
    } catch (err) {
        console.log(err);
    }
}

async function editUserModel(userId, newInfo) {
    try {
        console.log("userId", userId);
        console.log("newInfo", newInfo);
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: newInfo },
            { new: true }
        );
        // const note = await Note.findById(noteId);
        // note.text = newInfo.text;
        // await note.save()

        return user;
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

module.exports = { getAllUsersModel, getUserByEmailModel, editUserModel };
