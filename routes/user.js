const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const keycloak = require('../config/keycloak-config.js').getKeycloak();

//Get all users
router.get("/", keycloak.protect('admin'), async (req, res) => {
    try{
        const entries = await userModel.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Get one users
router.get("/:user", keycloak.protect(['user','admin']), getUser, (req, res) => {
    res.json(res.user);
});

//Create one user
router.post("/", keycloak.protect(['user','admin']), async (req, res) => {
    const incomming = new userModel({
        username: req.body.username,
        active: true,
        lastmodified: Date.now()
    });
    try{
        const newUser = await incomming.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Update one user
router.patch("/:user", keycloak.protect(['user','admin']), getUser, async (req, res) => {
    if(req.body.active != null){
        res.user.active = req.body.active;
    }
    try {
        res.user.lastmodified = Date.now();
        const updateUser = await res.user.save();
        res.json(updateUser)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Delete one user
router.delete("/:user", keycloak.protect('admin'), getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({message: "Successfully deleted entry"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


async function getUserByUsername(username){
    try{
        return await userModel.findById(username);
    } catch (error) {
        throw(error);
    }
}

//Middleware to get a user
async function getUser(req, res, next) {
    let user;
    try{
        user = await getUserByUsername(req.params.user);
        if(!user){
            return res.status(404).json({message: "Cannot find user"});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.user = user;
    next();
}

module.exports = {
    router: router, 
    getUser: getUser,
    getUserByUsername: getUserByUsername
    
};

