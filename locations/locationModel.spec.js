process.env.NODE_ENV = 'testing';
const db = require('../database/dbConfig');
const Location = require('./locationModel');

describe('Model for locations', () => {
  beforeEach(() => db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run()));

  afterEach(() => db.migrate.rollback());
});

describe('location /GET location by query parameters testing', () => {
  const place = {
    id: 1,
    name: 'SPAR Ilupeju',
    description: 'A spar to code in.',
    image_url: 'https://image.flaticon.com/icons/svg/201/201559.svg',
    address: '31, Ilupeju Mall, 33 Town Planning Way, Ilupeju 100252, Lagos',
    longitude: '3.3663045',
    latitude: '6.553909',
  };
  it('is able to be an array object', async () => {
    const lat = '6.5663896';
    const long = '3.3662124';
    const locations = await Location.getLocationByQuery(lat, long);
    expect(locations).toBeInstanceOf(Array);
  });
  it('is should not be null', async () => {
    const lat = '6.5663896';
    const long = '3.3662124';
    const locations = await Location.getLocationByQuery(lat, long);
    expect(locations).not.toBeNull();
    expect(locations).not.toBeUndefined();
  });
  it('should not be undefined', async () => {
    const lat = '6.5663896';
    const long = '3.3662124';
    const locations = await Location.getLocationByQuery(lat, long);
    expect(locations).not.toBeUndefined();
  });
  it('should return undefined when the array length is zero', async () => {
    const lat = '6.5663896';
    const long = '3.3662124';
    const locations = await Location.getLocationByQuery(lat, long);
    if (locations.length === 0) {
      expect(locations).toBeUndefined();
    }
  });
  it('should be equal to or greater than 1, when the array is not empty', async () => {
    const lat = '6.5663896';
    const long = '3.3662124';
    const locations = await Location.getLocationByQuery(lat, long);
    if (locations.length !== 0) {
      expect(Number(locations.length)).toBeGreaterThanOrEqual(1);
    }
  });
  it('should match object type for each of the object in the table', async () => {
    const lat = '6.5663896';
    const long = '3.3662124';
    const locations = await Location.getLocationByQuery(lat, long);
    if (locations.length !== 0) {
      expect(locations[0]).toMatchObject(place);
    }
  });
  it('should be an instance of object', async () => {
    const lat = '6.5663896';
    const long = '3.3662124';
    const locations = await Location.getLocationByQuery(lat, long);
    if (locations.length !== 0) {
      expect(locations[0]).toBeInstanceOf(Object);
    }
  });
});
