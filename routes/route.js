// route.js file 
const express = require("express");
var router = express.Router();

// use passport module as authentication middleware for API.
const passport = require("passport");

// user.js - defined all the database related function inside the model/user.js
const db = require("../model/user");

// swagger-ui-express- This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file
const swaggerUi = require('swagger-ui-express');

// load the swagger.json file
const swaggerDocument = require('../swagger.json');

// route : "/api", which helps to render swagger UI 
router.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// route : "/token", which helps to generate JWT token
router.post("/token", db.token);

// route : "/userlist", which return the list of users from database 
router.get("/userlist", passport.authenticate('jwt', { session: false }), db.userlist);

// route : "/createuser", create new user in database
router.post("/createuser",passport.authenticate('jwt', { session: false }), db.createuser);

// route : "/create", create "user" table into the database by query
router.get("/crete",db.create);

// route : "/dynamic",  to run any dynamic query in database
router.get("/dynamic",db.dynamic);

module.exports = router;
