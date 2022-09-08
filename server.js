require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const dbCol = require("./monSchema");
const usersRoute = require("./routes/usersRoute");
const bodyParser = require('body-parser');

const petsRoute = require('./routes/petsRoute')
const db = process.env.DATABASE;

mongoose.connect(db, () => {
    console.log("connected to Mongoose database");
});


app.use(bodyParser.json());


app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/pets", petsRoute);

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
