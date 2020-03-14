var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var users = [
  {
    id: 1,
    name: 'jay',
    password: 'jay'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest =ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

var app = express();
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/token", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  // var user = users[_.findIndex(users, {name: name})];
  // if( ! user ){
  //   res.status(401).json({message:"no such user found"});
  // }

    var payload = {id: 1};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});

  // if(user.password === req.body.password) {
  //   // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
  //   var payload = {id: user.id};
  //   var token = jwt.sign(payload, jwtOptions.secretOrKey);
  //   res.json({message: "ok", token: token});
  // } else {
  //   res.status(401).json({message:"passwords did not match"});
  // }
});

app.get("/userlist", passport.authenticate('jwt', { session: false }), function(req, res){
  res.status(200).json({message: "userlist! Header......."});
});

app.get("/contactlist", passport.authenticate('jwt', { session: false }), function(req, res){
  res.status(200).json({message: "contactlist ...Success!"});
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Express running");
});
