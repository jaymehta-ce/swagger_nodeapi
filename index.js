var express = require("express");
var bodyParser = require("body-parser");
require('dotenv')
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
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Express running");
});