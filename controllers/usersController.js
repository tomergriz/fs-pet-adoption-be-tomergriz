const { v4: uuidv4 } = require("uuid");
const {
    getAllUsersModel,
    signUpModel,
    getUserByEmailModel,
    deleteUserModel,
} = require("../models/userModel");

// async function getAllNotes(req, res) {
//   try {
//     const allNotes = getAllNotesModel()
//     res.send(allNotes);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// }

async function signUp(req, res) {
    try {
        const { email, password, firstName, lastName, phoneNumber } = req.body;
        
        const newUser = {
            id: uuidv4(),
            date: Date.now(),
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
        };


        const user = await signUpModel(newUser);
        if (user) {
            res.send(newUser);
            return;
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
}

function login(req, res) {
    try {
      const { user } = req.body;
      const token = jwt.sign({ id: user.userId }, process.env.TOKEN_SECRET, { expiresIn: "2h" });
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

module.exports = { signUp, login  /*, getAllNotes, , deleteNote*/ };
