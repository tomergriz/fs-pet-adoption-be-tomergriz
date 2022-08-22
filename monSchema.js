const mongoose = require('mongoose')

const Schema = new mongoose.Schema(
    {name:String,
        type:String}
    )

    module.exports = mongoose.model('Users', Schema)