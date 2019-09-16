const Review = require('./reviewModel');

describe('Model for review', () => {
  const review = {
    quietness: 2,
    wifi_speed: 3,
    community: 4,
    accessibility: 5,
    description: 'Place was great',
    user_id: 5,
    location_id: 95,
  };
  it('should return a review object if location exists', async () => {
    const locationReview = await Review.addReview(review);
    expect(locationReview).toBeDefined();
  });
});
