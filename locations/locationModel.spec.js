const db = require('../database/dbConfig');
const Location = require('./locationModel');

describe('Model for locations', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(() => db.migrate.rollback());
});

describe('location /GET location by query parameters testing', () => {
  it('should return an array of objects ', async () => {
    const lat = '-34.58';
    const long = '-58.44';
    const locations = await Location.getLocationByQuery(lat, long);
    expect(locations).toBeInstanceOf(Array);
    expect(locations).not.toBeUndefined();
    expect(locations).not.toBeNull();
    expect(locations[0]).toBeInstanceOf(Object);
  });

  it('array should not be empty when location exists', async () => {
    const lat = '-34.58';
    const long = '-58.44';
    const locations = await Location.getLocationByQuery(lat, long);
    expect(locations.length).toBeGreaterThanOrEqual(1);
  });
  it('array should be less than or equal to 30', async () => {
    const lat = '-34.58';
    const long = '-58.44';
    const locations = await Location.getLocationByQuery(lat, long);
    expect(locations.length).toBeLessThanOrEqual(30);
  });
  it('should return empty array if no location exists', async () => {
    const lat = '6.35552';
    const long = '-58.44';
    const locations = await Location.getLocationByQuery(lat, long);
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toEqual(0);
  });
  it('all latitudes in array must be within 15km range of location', async () => {
    const lat = '-34.58';
    const long = '-58.44';
    const locations = await Location.getLocationByQuery(lat, long);
    const latitudes = locations.map(location => location.latitude);
    latitudes.forEach(latitude => {
      expect(Number(latitude)).toBeGreaterThan(Number(lat) - 0.135);
      expect(Number(latitude)).toBeLessThan(Number(lat) + 0.135);
    });
  });
  it('all longitudes in array must be within 15km range of location', async () => {
    const lat = '-34.58';
    const long = '-58.44';
    const locations = await Location.getLocationByQuery(lat, long);
    const longitudes = locations.map(location => location.longitude);
    longitudes.forEach(longitude => {
      expect(Number(longitude)).toBeGreaterThan(Number(long) - 0.135);
      expect(Number(longitude)).toBeLessThan(Number(long) + 0.135);
    });
  });
});
