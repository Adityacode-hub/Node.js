const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email: String,

    name: String,

    authSource: String

});

module.exports = mongoose.model("User", userSchema);