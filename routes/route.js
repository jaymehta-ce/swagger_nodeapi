const express = require("express");
var router = express.Router();
const passport = require("passport");
const db = require("../model/user");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.post("/token", db.token);
router.get("/userlist", passport.authenticate('jwt', { session: false }), db.userlist);
router.post("/createuser",passport.authenticate('jwt', { session: false }), db.createuser);
router.get("/crete",db.create);

module.exports = router;