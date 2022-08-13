const fs = require("fs");
const path = require("path");

const pathToUsersDb = path.resolve(__dirname, "../database/usersDb.json");

function getAllUsersModel() {
  try {
    const allUsers = fs.readFileSync(pathToUsersDb);
    return JSON.parse(allUsers);
  } catch (err) {
    console.log(err);
  }
}

function addUserModel(newUser) {
    try {
      const allUsers = getAllUsersModel();
      allUsers.push(newUser);
      fs.writeFileSync(pathToUsersDb, JSON.stringify(allUsers));
      return true;
    } catch (err) {
      console.log(err);
    }
  }
function getUserByEmailModel(email) {
  try {
    const allUsers = getAllUsersModel();
    const user = allUsers.find((user) => user.email === email);
    return user
  } catch (err) {
    console.log(err);
  }
}

  function deleteUserModel(userId) {
    try {
      const allUsers = getAllUsersModel();
      const writeFileSync = allUsers.filter((user) => user.id !== userId);
      fs.writeFileSync(pathToUsersDb, JSON.stringify(writeFileSync));
      return true;
    } catch (err) {
      console.log(err);
    }
  }

module.exports = { getAllUsersModel, addUserModel,  getUserByEmailModel, deleteUserModel };
