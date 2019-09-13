const { getReviewById } = require('../reviews/reviewModel');

const getReviews = async id => {
  const reviews = await getReviewById(id);

  return reviews;
};

const generateAverageRatings = async locationId => {
  let averageQuietness = 0;
  let averageWifiSpeed = 0;
  let averageAccessibility = 0;
  let averageCommunity = 0;

  const reviews = await getReviews(locationId);
  const lengthOfReviews = reviews.length;

  if (lengthOfReviews === 0) {
    return {
      averageQuietness: null,
      averageAccessibility: null,
      averageCommunity: null,
      averageWifiSpeed: null,
    };
  }

  reviews.map(review => {
    averageQuietness += review.quietness;
    averageAccessibility += review.accessibility;
    averageCommunity += review.community;
    averageWifiSpeed += review.wifi_speed;
  });

  return {
    averageQuietness: Math.floor(averageQuietness / lengthOfReviews),
    averageAccessibility: Math.floor(averageAccessibility / lengthOfReviews),
    averageCommunity: Math.floor(averageCommunity / lengthOfReviews),
    averageWifiSpeed: Math.floor(averageWifiSpeed / lengthOfReviews),
  };
};

const findCummulativeAverageRating = async locationId => {
  let average = 0;

  const ratings = await generateAverageRatings(locationId);
  const lengthOfRatings = Object.values(ratings).length;

  if (ratings.averageQuietness === null) return null;

  Object.values(ratings).map(rating => {
    average += rating;
  });

  return Math.floor(average / lengthOfRatings);
};

module.exports = {
  getReviews,
  generateAverageRatings,
  findCummulativeAverageRating,
};
