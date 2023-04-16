const express = require("express");
const router = express.Router();
const foragebiotaModel = require("../models/foragebiotaModel");
const group = require("./foragegroup");
const keycloak = require('../config/keycloak-config.js').getKeycloak();

//Get all biota
router.get("/:group", keycloak.protect('user'), group.getForagegroup, async (req, res) => {
    try{
        const entries = await foragebiotaModel.find({group: req.params.group}).exec();
        res.json(entries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Get one biota
router.get("/:group/:biota", keycloak.protect('user'), group.getForagegroup, getForagebiota, (req, res) => {
    res.json(res.foragebiota);
});

//Create one biota
router.post("/:group", keycloak.protect('user'), group.getForagegroup, async (req, res) => {
    const incomming = new foragebiotaModel({
        name: req.body.name,
        group: res.foragegroup,
        isEdible: req.body.isEdible,
        imageURI: req.body.imageURI,
        comment: req.body.comment
    });
    try{
        const newForagebiota = await incomming.save();
        res.status(201).json(newForagebiota.id);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Update one Biota
router.patch("/:group/:biota", keycloak.protect('user'), group.getForagegroup, getForagebiota, async (req, res) => {
    if(req.body.name){
        res.foragebiota.name = req.body.name;
    }
    if(req.body.group){
        res.foragebiota.group = res.foragegroup;
    }
    if(req.body.isEdible != null){
        res.foragebiota.isEdible = req.body.isEdible;
    }
    if(req.body.imageURI){
        res.foragebiota.imageURI = req.body.imageURI;
    }
    if(req.body.comment){
        res.foragebiota.comment = req.body.comment;
    }
    try {
        const updatedForagebiota = await res.foragebiota.save();
        res.json(updatedForagebiota)
    } catch (err) {
        res.status(400).json({message: error.message});
    }
});

//Delete one Biota
router.delete("/:group/:biota", keycloak.protect('user'), group.getForagegroup, getForagebiota, async (req, res) => {
    try {
        await res.foragebiota.deleteOne();
        res.json({message: "Successfully deleted entry"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Delete all Biota in group
router.delete("/:group", keycloak.protect('user'), group.getForagegroup, async (req, res) => {
    try {
        await foragebiotaModel.deleteMany({group: req.params.group});
        res.json({message: "Successfully deleted all ForageBiota"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Middleware to get a biota
async function getForagebiota(req, res, next) {
    let foragebiota;
    try{
        foragebiota = await foragebiotaModel.findById(req.params.biota);
        if(!foragebiota){
            return res.status(404).json({message: "Cannot find foragebiota entry"});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.foragebiota = foragebiota;
    next();
}

module.exports = {
    router: router,
    getForagebiota: getForagebiota
};

