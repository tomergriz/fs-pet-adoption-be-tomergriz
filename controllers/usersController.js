const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const {
    getAllUsersModel,
    signUpModel,
    getUserByEmailModel,
    deleteUserModel,
} = require("../models/userModel");

const newUser = require("../models/userModelMongoose");

// async function getAllNotes(req, res) {
//   try {
//     const allNotes = getAllNotesModel()
//     res.send(allNotes);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// }

async function signUp(req, res, next) {
    try {
        const { email, password, firstName, lastName, phone  } = req.body;
        const createUser = new newUser({
            email,
            password,
            firstName,
            lastName,
            phone,
            date: Date.now(),
        });

        const user = await createUser.save();
        if (user) {
            res.send(user);
            console.log("res.send", user);
            return;
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
}

async function getAllUsers(req, res) {
    try {
      const allUsers = await getAllUsersModel();
      console.log("allUsersControl",allUsers);
      res.send(allUsers);
      return allUsers;
    } catch(err) {
      res.status(500).send(err);
    }
  }




function login(req, res) {
    try {
        const { user } = req.body;
        const token = jwt.sign({ id: user.userId }, process.env.TOKEN_SECRET, {
            expiresIn: "2h",
        });
        res.send({ token: token, user: user.name });
    } catch (err) {
        console.log(err);
    }
}


// async function deleteNote(req, res) {
//   try {
//     const {noteId} = req.params
//     console.log(noteId);
//     const deletedNote =  deleteNoteModel(noteId)
//     if(deletedNote) {
//       res.send({ok: true, deletedNote: noteId, message: 'Note Deleted'});
//       return
//     }

//   } catch (err) {
//     console.log(err)
//     res.status(500).send(err);
//   }
// }

module.exports = { signUp, login, getAllUsers /*, getAllNotes, , deleteNote*/ };
