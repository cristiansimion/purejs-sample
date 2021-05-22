const partnerList = [
  {
    organization: 'Aston Martin',
    offices: [
      {
        location: 'Location 1',
        address: 'Address 1',
        coordinates: '-33.8934219,151.20404600000006',
      },
    ],
  },
];

// Could name it simply fetch, but should not be confused with node-fetch
exports.fetchData = (endpoint) => {
  return Promise.resolve(partnerList);
};
