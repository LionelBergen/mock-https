# mock-https
----------
Simple library for mocking https calls inside of tests.  
Works by using `sinon` to mock out `https` library.

![https://www.npmjs.com/package/mock-https](https://nodei.co/npm/mock-https.png)

Example test class utilizing mock-https
--------------  

<p>

####

```javascript
const mockhttps = require('mock-https');
let sampleUrlResponse = "...";

afterEach(function() {
  mockhttps.reset();
});

describe('description of test', () => {
  it('should blah blah', async () => {
    mockhttps.get('https://www.url.com/something.json?limit=5', sampleUrlResponse);
    
    const result = await SomeClass.methodThatUsesHttps();
	assert.equal("", result);
  });
});


```