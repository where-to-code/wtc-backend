const Review = require('./reviewModel');
<<<<<<< HEAD
=======
const db = require('../database/dbConfig');

describe('Reset DB', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(() => db.migrate.rollback());
});
>>>>>>> Write tests for review model and controller

describe('Model for review', () => {
  const review = {
    quietness: 2,
    wifi_speed: 3,
    community: 4,
    accessibility: 5,
    description: 'Place was great',
    user_id: 5,
    location_id: 95
  };
  it('should return a review object if location exists', async () => {
    const locationReview = await Review.addReview(review);
    expect(locationReview).toBeDefined();
  });
});
