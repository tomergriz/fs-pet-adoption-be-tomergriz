require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");
const bodyParser = require("body-parser");

const petsRoute = require("./routes/petsRoute");
const db = process.env.MONGO_URI;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

mongoose.set("strictQuery", "throw");
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Mongoose database");
    })
    .catch((error) => {
        console.error("Error connecting to Mongoose database ", error);
    });

app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/pets", petsRoute);

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// const jwt = require('jsonwebtoken');

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTIwMzY2Zjg0M2YzMTJlZTcxNGNjNCIsImlhdCI6MTY3ODg2ODQ0NSwiZXhwIjoxNjc4ODc1NjQ1fQ.5b-48HwG6WETQcVyE1TIb6EUkqvWZLaUkAT4dL_aqXU';
// const secret = process.env.TOKEN_SECRET;

// jwt.verify(token, secret, (err, decoded) => {
//   if (err) {
//     console.error(err.message);
//     // handle error
//   } else {
//     console.log(decoded);
//     // decoded token payload
//   }
// });
