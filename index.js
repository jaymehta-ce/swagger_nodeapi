// index.js
const express = require("express");

// body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require("body-parser");

// loads environment variables from a .env file into process.env
require('dotenv')

// register route from routes/route.js file.
const route = require("./routes/route");
var app = express();

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())
app.use(route);

// start server
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Express running");
});
