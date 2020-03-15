const pg = require('pg');
const express = require("express");
const app = express();
var _ = require("lodash");
const passport = require("passport");
const passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
pg.defaults.ssl = true;
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
const jwt = require('jsonwebtoken');
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

module.exports = {
    token: (req, res) => {
        if (req.body.name && req.body.password) {
            var name = req.body.name;
            var password = req.body.password;
        }
        var payload = {
            id: 1
        };
        var token = "JWT " + jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({
            message: "ok",
            token: token
        });
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
            email
        } = req.body;
        pool.query('INSERT INTO users (firstname, lastname, email) VALUES ($1, $2, $3)', [firstname, lastname, email], (error, results) => {
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
    }
};