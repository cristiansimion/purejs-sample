const https = require('https');

// Could name it simply fetch, but should not be confused with node-fetch
exports.fetchData = (endpoint) => new Promise((resolve, reject) => {
  https.get(endpoint, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      resolve(JSON.parse(data));
    });

  }).on('error', (err) => {
    reject(err);
  });
});
