const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: false
    },
    lastModified: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = mongoose.model("user", userSchema);