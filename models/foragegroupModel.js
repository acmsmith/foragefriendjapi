const mongoose = require("mongoose");

const foragegroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

module.exports = mongoose.model("foragegroup", foragegroupSchema);