 var mocha = require('mocha')
  var describe = mocha.describe
  var it = mocha.it
  var assert = require('chai').assert;
      const fs = require('fs');

  function iThrowError(msg) {
     throw new Error(msg);
  }
describe('check', function() {
    it('swagger file exists or not', function() {
      const path = '../../swagger1.json';
        if (fs.existsSync(path)) {
           done();
         }
       else
       {
        assert.throw(iThrowError('Swagger file not found'), Error, 'Error thrown');
       }
    })
  })
