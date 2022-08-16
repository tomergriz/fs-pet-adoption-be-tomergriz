require("dotenv").config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')

const usersRoute = require('./routes/usersRoute')
// const petsRoute = require('./routes/petsRoute')

app.use(express.json())
app.use(cors())

app.use('/users',  usersRoute)
// app.use('/pets',  petsRoute)

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})