# Node API using Swagger, Passport, JWT, Postgres and Mocha

In this demo, I have created an authentication with JSON Web Tokens. I have sent the jwt with every request, meaning that we don’t rely on sessions, but simply put the token on every request we make to the API. This way we don’t have to worry about cookies, but we can save it in localStorage or other places on the frontend. I have used passport-jwt with express framework.

# Swagger UI Express
This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file. The result is living documentation for your API hosted from your API server via a route.

# Usage of Swagger
Install using npm:
```
$ npm install swagger-ui-express
```
Express setup app.js
```
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```
# passport-jwt

A Passport strategy for authenticating with a JSON Web Token.
This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.

Created below routes for token:
1. Creating a /token route to acquire a token
(If a user has been found and the password is correct, we set the payload for the JWT to {id: user.id} we use the jsonwebtoken package to create the token and respond with it. If the password entered is wrong then appropriate message is displayed to the user.)
2. Creating a /createuser and /userlist route, that only is available to logged in users with a JSON web token
(Use the token to be able to access some kind of secret information. In route, we pass the request through previously defined authentication strategy and run it. If it’s successful, then display success message, else the request will be unauthorized (401).)

# Configuration variable
Postgres database is used to store the user information and its configuration will be loaded from .env file using "dotenv" npm module.
```
DB_USER=<value>
DB_HOST=<value>
DB_DATABASE=<value>
DB_PASSWORD=<value>
DB_PORT=5432
JWT_SECRETKEY=<value>
```

# Unit Testing using Mocha
Create test.js File in test folder.
```
describe('check', function() {
    it('swagger file exists or not', function(done) {
        const path = '././swagger.json';
        if (fs.existsSync(path)) {
            console.log("success");
            done();
        } else {
            assert.throw(iThrowError('Swagger file not found'), Error, 'Error thrown');
        }
    })
```

# Run Test on starting of project
```
mocha test/test.js
```

# Deployment on HEROKU
Heroku is a cloud platform as a service (PaaS) supporting several programming languages. It also provides custom buildpacks with which the developer can deploy apps in any other language.
