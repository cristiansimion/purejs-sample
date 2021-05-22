const { partnersInRadiusPromise } = require('./api');
const { organizationASC } = require('./sorting');

const searchOptions = { radius: 100, lat: 51.515419, lon: -0.141099 };
partnersInRadiusPromise(searchOptions)
  .then(partners => {
    partners.sort(organizationASC);
    console.log(partners);
  }).catch(console.log);
