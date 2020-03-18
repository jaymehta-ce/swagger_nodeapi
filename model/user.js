// user.js file

// pg - use Postgres database using pg module.
const pg = require('pg');
const express = require("express");
const app = express();
var _ = require("lodash");

// we use the jsonwebtoken package to create the token and respond with it
const jwt = require('jsonwebtoken');
const passport = require("passport");

// passport-jwt - This module lets you authenticate endpoints using a JSON web token.
const passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
pg.defaults.ssl = true;
const Pool = require('pg').Pool;

// creating pool by passing paramerer from the .env file
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
var users = [{
    id: 1,
    name: 'jay',
    password: 'jay'
}];
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = process.env.JWT_SECRETKEY;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

    console.log(jwt_payload);
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, {
        id: jwt_payload.id
    })];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);
app.use(passport.initialize());

// created below functions:
// 1. token function will generate the JWT token
// 2.createuser function will create new user in database with email validation.
// 3.userlist function will return list of all the user details from database.
// 4.create function will create "user" table in the database by query.
// 5.dynamic function will helps to run dynamic query.
module.exports = {
    token: (req, res) => {
        if (req.body.name == 'jay' && req.body.password == 'jay') {
            var name = req.body.name;
            var password = req.body.password;
        
        var payload = {
            id: 1
        };
        var token = "JWT " + jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({
            message: "ok",
            token: token
        });
        }
        else
        {
           res.json({
            message: "authentication failed."
      });
        }
    },

    userlist: (req, res) => {
        pool.query('select * from users;', (error, results) => {
            if (error) {
                console.log(error);
                res.status(201).send("Error in fetching user.")
            }
            res.status(201).send(results.rows);
        })
    },
    createuser: (req, res) => {
        const {
            firstname,
            lastname,
            email,
            phone
        } = req.body;
      const emailToValidate = email;
      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      console.log(emailRegexp.test(emailToValidate))
      if(!emailRegexp.test(emailToValidate))
      {
         console.log("emailToValidate") 
         res.status(201).send("Email is not valid.");
         return;
      }
        pool.query('INSERT INTO users (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)', [firstname, lastname, email,phone], (error, results) => {
            if (error) {
                res.status(201).send("Error in creating new user.")
            }
            res.status(201).send(`User created successfully..`)
        })
    },
    create: (req, res) => {
        pool.query('CREATE TABLE users( \
                id SERIAL PRIMARY KEY, \
                firstname VARCHAR NOT NULL, \
                lastname VARCHAR NOT NULL, \
                email VARCHAR NOT NULL \
              );', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json("success")
        })
    },
    dynamic: (req, res) => {
      console.log(req.query.q);
      pool.query(req.query.q, (error, results) => {
            if (error) {
                res.status(200).json(error);
            }
            res.status(200).json("success")
        })
    }
};
