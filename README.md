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
# Passport & JWT

A Passport strategy for authenticating with a JSON Web Token.
This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.

# API routes

| Sr. No  |Route   |Method   |Description |
|---|---|---|---|
|  1 |/token  | POST  | Generate JWT token by entering username and password. If user is authenticated successfully, we set the payload for the JWT and "jsonwebtoken" module is used to create the token. If the password entered is wrong then appropriate message is displayed to the user.|
|  2 |/createuser   | POST  | Create new user in database after successful authentication. |
|  3 |/userlist   | GET  | View list of users from database after successful authentication. |

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
