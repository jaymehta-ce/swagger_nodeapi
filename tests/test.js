 var mocha = require('mocha')
  var describe = mocha.describe
  var it = mocha.it
  var assert = require('chai').assert
console.log("mocha.....")


describe('check', function() {
    it('swagger file exists or not', function() {
      const fs = require('fs')
      const path = '../../swagger.json'
      try {
        if (fs.existsSync(path)) {
          //file exists
         assert.throw(iThrowError('Swagger file not found'), Error, 'Error thrown');
        }
      } catch(err) {
        console.error(err)
      }
    })
  })
