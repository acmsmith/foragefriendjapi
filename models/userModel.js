const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    lastModified: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = mongoose.model("user", userSchema);