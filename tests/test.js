const assert = require('assert');
const fs = require('fs');

function iThrowError(msg) {
    throw new Error(msg);
}
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
})
