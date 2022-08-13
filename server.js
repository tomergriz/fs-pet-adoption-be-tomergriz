require("dotenv").config()

const express = require('express')
const PORT = process.env.PORT || 8080
const cors = require('cors')
const usersRoute = require('./routes/usersRoute')


const app = express()

app.use(express.json())
app.use(cors())

app.use('/users',  usersRoute)

app.get("*", (req, res) => {
  res.status(404).send("Page Not Fount");
});


app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})