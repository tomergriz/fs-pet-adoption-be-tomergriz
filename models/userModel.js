const fs = require("fs");
const path = require("path");

const pathToUsersDb = path.resolve(__dirname, "../database/usersDb.json");

const User = require ("./userModelMongoose")

 
function getUserByEmailModel(email) {
  try {
    const allUsers = getAllUsersModel();
    const user = allUsers.find((user) => user.email === email);
    return user
  } catch (err) {
    console.log(err);
  }
}

async function getAllUsersModel() {
  try {
    const allUsers = await User.find();
    console.log("allUsers", allUsers);
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}


module.exports = { getAllUsersModel,  getUserByEmailModel };
