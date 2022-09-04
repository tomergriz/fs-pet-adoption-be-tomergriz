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

        return user;
    } catch (err) {
        console.log(err);
    }
}

// async function verifyToken(req, res, next) {
//   // const { token } = req.cookies;
//   console.log('req', req)
//   res.send('res', res)
// jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//   if (err) {
//     res.status(401).send("Unauthorized");
//     return;
//   }
//   if (decoded) {
//     req.body.userId = decoded.id;
// next();
// return;
// }
// });
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

module.exports = { getAllUsersModel, getUserByEmailModel, editUserModel };
