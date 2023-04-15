const mongoose = require("mongoose");

const foragebiotaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foragegroup",
        required: true
    },
    isEdible:{
        type: Boolean,
        required: true
    },
    imageURI:{
        type: String,
        required: false
    },
    comment:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model("foragebiota", foragebiotaSchema);