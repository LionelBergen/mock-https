const https = require('https');
const sinon = require('sinon');
const assert = require('assert');

const sandbox = sinon.createSandbox();

/**
 * A class for mocking responses from https calls.
 * Just an object that has an 'on' method
*/
class FakeClientRequestObject {
  on(nameOfEvent) {
  }
}

class FakeHttpResponse {
  constructor(response) {
    this.response = response;
    this.statusCode = 200;
  }
  
  on(nameOfEvent, data) {
    data(this.response);
  }
}

class MockHttps {
  get(expectedUrl, response) {
    sandbox.stub(https, 'get').callsFake(function(url, callbackFunction) {
      assert.equal(expectedUrl, url, 'URL did not match expected. Expected: ' + expectedUrl + ' but was: ' + url);
      
      const resp = new FakeHttpResponse(response);
      
      // invoke the response object given our fake data
      callbackFunction(resp);
      
      // We need to return an object that can have '.on(error ..)' invoked on
      return new FakeClientRequestObject();
    });
  }
  
  reset() {
    sandbox.resetBehavior();
    sandbox.restore();
  }
}

module.exports = new MockHttps();