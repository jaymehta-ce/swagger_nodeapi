 var mocha = require('mocha')
  var describe = mocha.describe
  var it = mocha.it
  var assert = require('chai').assert;
      const fs = require('fs')
describe('check', function() {
    it('swagger file exists or not', function() {
      const path = '../../swagger1.json'
      try {
        if (fs.existsSync(path)) {
           done();
         }
       else
       {
        assert.throw(throw new Error('Swagger file not found'), Error, 'Error thrown');
       }
      } catch(err) {
        console.error(err)
      }
    })
  })
