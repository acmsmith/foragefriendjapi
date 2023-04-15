require("dotenv").config();

const express = require('express');
const cors = require("cors");
const port = process.env.PORT;

//Setup database connnection.
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database."));

//Define access toi get information from package.json file.
var pjson = require('./package.json');

//Create app instance
const app = express();

//Setup server to use JSON and Cors
app.use(express.json());
app.use(cors());

//Create rout for user
const userRouter = require("./routes/user");
app.use("/user", userRouter.router);

//Create rout for forageGroup
const foragegroupRouter = require("./routes/foragegroup");
app.use("/foragegroup", foragegroupRouter.router);

//Create rout for foragebiota
const foragebiotaRouter = require("./routes/foragebiota");
app.use("/foragebiota", foragebiotaRouter.router);

//Default Root response
app.get("/", (req, res) => {
    res.send("ForageFriend API, version: "+pjson.version);
});

//Begin listening
app.listen(port, () => {
  console.log(`ForageFriend API is listening on port ${port}`);
})
