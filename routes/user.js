const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

//Get all users
router.get("/", async (req, res) => {
    try{
        const entries = await userModel.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Get one users
router.get("/:user", getUser, (req, res) => {
    res.json(res.user);
});

//Create one user
router.post("/", async (req, res) => {
    const incomming = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        active: true
    });
    try{
        const newUser = await incomming.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Update one user
router.patch("/:user", getUser, async (req, res) => {
    if(req.body.email){
        res.user.email = req.body.email;
    }
    if(req.body.active != null){
        res.user.active = req.body.active;
    }
    if(req.body.password){
        res.user.password = req.body.password;
    }
    if(req.body.token){
        res.user.token = req.body.token;
    }
    try {
        const updateUser = await res.user.save();
        res.json(updateUser)
    } catch (err) {
        res.status(400).json({message: error.message});
    }
});

//Delete one user
router.delete("/:user", getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({message: "Successfully deleted entry"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Middleware to get a user
async function getUser(req, res, next) {
    let user;
    try{
        user = await userModel.findById(req.params.user);
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
    getUser: getUser
};

