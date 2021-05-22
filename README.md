## Instructions
`$ npm install`

## Structure

### Vanilla NodeJS deep clone functionality
`deepClone.js`
`deepClone.test.js`

### Find partners within radius using lat, lon
>`index.js` - Main file. Here you configure lat, lon, radius.

>`greatCircleDistance.js` - Mathematical algorithm for distance between lat & lon points.

>`fetchData.js` - https.request in a promised version for cleaner code.

> `api.js` - This is where the magic happens with the endpoint. Finds offices and returns partners with matching offices.

> `sorting.js` - This could have been inlined, but I separated for structure since we can add multiple orders and then export a switcher that works with strings. This way, the code in index.js (main app) would change minimally. 

`api.test.js` - to test the API functionality which includes: 

- `findOffices` should return a list of offices within radius
- `findOffices` should return an empty array of offices within radius
- `partnersInRadiusPromise` should return a list partners with offices in radius
- `partnersInRadiusPromise` should return an empty list of partners because out of bounds
- `organizationASC` should sort the partners array ascending by organization name

`__mock__/fetchData.js` for fetchData.js mocking in jest 
