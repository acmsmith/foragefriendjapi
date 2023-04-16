const express = require("express");
const router = express.Router();
const foragegroupModel = require("../models/foragegroupModel");
const user = require("./user");
const keycloak = require('../config/keycloak-config.js').getKeycloak();

//Get all foragegroups
router.get("/:user", keycloak.protect('user'), user.getUser, async (req, res) => {
    try{
        const entries = await foragegroupModel.find({user: req.params.user});
        res.json(entries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Get one foragegroup
router.get("/:user/:group", keycloak.protect('user'), user.getUser, getForagegroup, (req, res) => {
    res.json(res.foragegroup);
});

//Create one foragegroup
router.post("/:user", keycloak.protect('user'), user.getUser, async (req, res) => {
    const incomming = new foragegroupModel({
        name: req.body.name,
        user: res.user
    });
    try{
        const newForagegroup = await incomming.save();
        res.status(201).json(newForagegroup.id);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Update one foragegroup
router.patch("/:user/:group", keycloak.protect('user'), user.getUser, getForagegroup, async (req, res) => {
    if(req.body.name){
        res.foragegroup.name = req.body.name;
    }
    try {
        const updateForagegroup = await res.foragegroup.save();
        res.json(updateForagegroup)
    } catch (err) {
        res.status(400).json({message: error.message});
    }
});

//Delete one foragegroup
router.delete("/:user/:group", keycloak.protect('user'), user.getUser, getForagegroup, async (req, res) => {
    try {
        await res.foragegroup.deleteOne();
        res.json({message: "Successfully deleted entry"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Middleware to get a foragegroup
async function getForagegroup(req, res, next) {
    let foragegroup;
    try{
        foragegroup = await foragegroupModel.findById(req.params.group);
        if(!foragegroup){
            return res.status(404).json({message: "Cannot find foragegroup"});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.foragegroup = foragegroup;
    next();
}

module.exports = {
    router: router,
    getForagegroup: getForagegroup
};

