require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const petsRoute = require("./routes/petsRoute");
const db = process.env.MONGO_URI;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
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

app.use("/images", express.static("Images"));
app.use("/users", usersRoute);
app.use("/pets", petsRoute);

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});