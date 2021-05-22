const { getDistanceFromLatLonInKm } = require('./greatCircleDistance');
const { fetchData } = require('./fetchData');
// set endpoint
const apiEndpoint = 'https://samples.cristiansimion.com/partners.json';

exports.findOffices = (offices, inputLocation) => {
  const officesInRange = offices.map(office => {
    const { coordinates } = office;
    const [officeLat, officeLon] = coordinates.split(',');

    const distance = getDistanceFromLatLonInKm(
      inputLocation.lat, inputLocation.lon,
      officeLat, officeLon,
    );

    // Truthy - returns false || {...office}
    return inputLocation.radius >= distance &&
      { ...office };
  });

  return officesInRange.filter(hasValue => hasValue);
};

// Format lat,lon
exports.partnersInRadiusPromise = async ({ radius = 100, lat = -0.141099, lon = 51.515419 }) => {
  const partnerList = await fetchData(apiEndpoint);
  const inputLocation = { radius, lat, lon };

  return partnerList.map(partner => {
    const { offices } = partner;
    const foundOffices = this.findOffices(offices, inputLocation);

    // Truthy - returns false || {}
    return foundOffices.length &&
      {
        ...partner,
        offices: foundOffices,
      };
  }).filter(partner => partner);
};
