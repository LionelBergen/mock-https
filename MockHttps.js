const https = require('https');
const sinon = require('sinon');
const assert = require('assert');

const sandbox = sinon.createSandbox();

/**
 * A class for mocking responses from https calls.
 * Just an object that has an 'on' method
*/
class FakeClientResponseObject {
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

/**
 * Helper class for mocking out reqiore('https') using Sinon
*/
class MockHttps {
  /**
   * Expect a https.get call, and returns a mock response object
   *
   * @param expectedUrl Assert the call was at this URL
   * @param response Mock data we want the https.get call to generate
  */
  expectGet(expectedUrl, response) {
    sandbox.stub(https, 'get').callsFake(function(url, callbackFunction) {
      assert.equal(expectedUrl, url, 'URL did not match expected. Expected: ' + expectedUrl + ' but was: ' + url);

      // invoke the response object given our fake data
      callbackFunction(new FakeHttpResponse(response));
      
      // We need to return an object that can have '.on(error ..)' invoked on
      return new FakeClientResponseObject();
    });
  }
  
  /**
   * Should be called between tests. Resets the sinon states
  */
  reset() {
    sandbox.resetBehavior();
    sandbox.restore();
  }
}

module.exports = new MockHttps();