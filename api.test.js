const { organizationASC } = require('./sorting');
jest.mock('./fetch');

const partners = [
  {
    organization: 'Waton Narti',
    offices: [
      {
        location: 'Location 1',
        address: 'Address 1',
        coordinates: '-33.8934219,151.20404600000006',
      },
    ],
  },
  {
    organization: 'Bertas Auto',
    offices: [
      {
        location: 'Location 2',
        address: 'Address 2',
        coordinates: '-75,24',
      },
      {
        location: 'Location 3',
        address: 'Address 3',
        coordinates: '-75,24',
      },
    ],
  },
];
const { partnersInRadiusPromise, findOffices } = require('./api');

test('should return a list of offices within radius', () => {
  const inputLocation = { radius: 100, lat: -75, lon: 24 };
  const { offices } = partners[1];
  const officeList = findOffices(offices, inputLocation);
  expect(officeList).toEqual(offices);
});

test('should return an empty array of offices within radius', () => {
  const inputLocation = { radius: 100, lat: -45, lon: 54 };
  const { offices } = partners[1];
  const officeList = findOffices(offices, inputLocation);
  expect(officeList).toEqual([]);
});

test('should return a list partners with offices in radius', () => {
  const searchOptions = { radius: 100, lat: -33.8934219, lon: 151.20404600000006 };
  partnersInRadiusPromise(searchOptions).then(result => {
    expect(result).toEqual([partners[0]]);
  }).catch(err => err);
});

test('should return an empty list of partners because out of bounds', () => {
  const partners = [];
  const searchOptions = { radius: 100, lat: -1, lon: 1 };
  partnersInRadiusPromise(searchOptions).then(result => {
    expect(result).toEqual(partners);
  }).catch(err => err);
});

test('should sort the partners array ascending by organization name', () => {
  const localPartners = [...partners];

  localPartners.sort(organizationASC);
  const mockOrder = [
    {
      organization: 'Bertas Auto',
      offices: [
        {
          location: 'Location 2',
          address: 'Address 2',
          coordinates: '-75,24',
        },
        {
          location: 'Location 3',
          address: 'Address 3',
          coordinates: '-75,24',
        },
      ],
    },
    {
      organization: 'Waton Narti',
      offices: [
        {
          location: 'Location 1',
          address: 'Address 1',
          coordinates: '-33.8934219,151.20404600000006',
        },
      ],
    },
  ];

  expect(localPartners).toEqual(mockOrder);
});
