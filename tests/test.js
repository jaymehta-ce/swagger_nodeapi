const assert = require('assert');
const fs = require('fs');

function iThrowError(msg) {
    throw new Error(msg);
}
describe('check', function() {
    it('swagger file exists or not', function() {
        const path = '../swagger.json';
        if (fs.existsSync(path)) {
            done();
        } else {
            assert.throw(iThrowError('Swagger file not found'), Error, 'Error thrown');
        }
    })
})
