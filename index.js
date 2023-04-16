require("dotenv").config();

const express = require('express');
const cors = require("cors");
const port = process.env.PORT;
const path = require('path');

//Setup database connnection.
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database."));

//Define access toi get information from package.json file.
var pjson = require('./package.json');

//Define utils
const utils = require ('./utils');

//Create app instance
const app = express();

//initialise keycloak
const keycloak = require('./config/keycloak-config.js').initKeycloak(app);
//app.use(keycloak.middleware());

//Setup server to use JSON and Cors
app.use(express.json());
app.use(cors());

//Create rout for keycloak testing
const keycloakRout = require("./routes/keycloaktest");
app.use("/keycloaktest", keycloakRout);

//Create rout for user
const userRouter = require("./routes/user");
app.use("/user", userRouter.router);

//Create rout for forageGroup
const foragegroupRouter = require("./routes/foragegroup");
app.use("/foragegroup", foragegroupRouter.router);

//Create rout for foragebiota
const foragebiotaRouter = require("./routes/foragebiota");
app.use("/foragebiota", foragebiotaRouter.router);

//Create rout for auth
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

//Default Root response
app.get("/", (req, res) => {
    res.redirect(`http://localhost:3000/version`);
});

//Version Route
app.get("/version", (req, res) => {
  res.send("ForageFriend API, version: "+pjson.version);
});


//Begin listening
app.listen(port, () => {
  console.log(`ForageFriend API is listening on port ${port}`);
})
