var express = require("express");
var bodyParser = require("body-parser");
require('dotenv')
const route = require("./routes/route");
var app = express();
 var mocha = require('mocha')
  var describe = mocha.describe
  var it = mocha.it
  var assert = require('chai').assert
console.log("mocha.....")


  describe('#indexOf()', function() {
    it('should return -1 when not present', function() {
      assert.equal([1,2,3].indexOf(4), -1)
    })
  })

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
