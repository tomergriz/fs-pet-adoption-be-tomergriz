const { v4: uuidv4 } = require("uuid");
const {
    getAllUsersModel,
    addUserModel,
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

async function signUp(req, res, next) {
    try {
        const { email, firstName, password, rePassword } = req.body;

        const newUser = {
            id: uuidv4(),
            date: Date.now(),
            email: email,
            firstName: firstName,
            password: password,
            rePassword: rePassword
        };

        console.log(newUser);

        const user = addUserModel(newUser);
        if (user) {
            res.send(newUser);
            return;
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
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

module.exports = { signUp /*, getAllNotes, , deleteNote*/ };
