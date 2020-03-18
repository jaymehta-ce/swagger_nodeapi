 var mocha = require('mocha')
  var describe = mocha.describe
  var it = mocha.it
  var assert = require('chai').assert
console.log("mocha.....")

mocha.ui('bdd').run(function (failures) {
    process.on('exit', function () {
      process.exit(failures);
    });
  });
  describe('#indexOf()', function() {
    it('should return -1 when not present', function() {
      assert.equal([1,2,3].indexOf(4), -1)
    })
  })
