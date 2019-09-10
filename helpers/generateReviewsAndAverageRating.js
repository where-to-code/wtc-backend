const generateRating = (max = 5, min = 1) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getReview = () => {
  const reviews = [];

  const descriptions = [
    'This is such a wonderful place to work out of. The environment is quite serene and I enjoyed every minute I spent there. I will be back for sure.',
    "A few things could have gone better. There were disturbances during work and I really couldn't achieve much. Wifi was great though.",
    'Such a cool and lovely place. Ambience, wifi, culture and easily accessible',
    'This hotel is awesome! It was superb and clean! Incredible staff and Can You Do My Homework - DoMyAssignmentForMe accommodating to us. We will visit and remain at this inn many occasions over. So cheerful to have discovered this gem in the ideal area!',
    "Very nice place for a wait people. google Its very nice place in a Soho. You can stay this and feeling so good. The more accepted mediums for newsworthy material are effortlessly identified. There are more websites presently that present a great deal of kitchen prep resume samples details. We want to encourage you to visit again sometime soon and inspect the fresh resources we'll have. The field dealing with kitchen prep resume samples is a wonderful field and discovering more about it is extremely profitable. That is a topic that our site can support you with. Our zeal for the category of kitchen prep resume samples has improved over time.",
    'This space is beautiful--uniquely designed, great lighting, very spacious, comfy seating & it’s always clean. They have the best selection of coffee & have kombucha on tap! 24/7 access amazing so I can get work done whenever but staff is there during the weekdays & are very friendly & helpful! They organize a bunch of cool events like happy hours with beer/wine tastings & a monthly women’s breakfast which are fun perks but also help you meet the other co-workers & feel like you’re in a community. They even offer monthly massages at the office! All in all, awesome space & I love working out of here!',
    'We had a rough time at the Yard Flatiron North. While we were there the air conditioning was broken multiple times, as was the elevator. In addition, they allow companies to run public facing businesses out their space, so anyone can just be wandering around the space unattended. Lastly, all of the doors are unlocked during business hours so anyone from the street can just come up to each floor and use the bathroom or kitchen. Women at front desk were nice, but lack of investment and systems meant the overall experience was pretty bad.',
    'I have the best experience with this place and everything is very perfect, corporative and also the main thing is the environment that is very interesting. I have worked for the best assignment writing services in this place so this is my personal experience.',
    'We as a professional thesis writer always need that kind of environment to work and spend some quality time with the other fellows, So thank you for providing us a great place to sit on and the way they facilitate it is one of the best place for freelancers who need space for their work.',
    "We've had the opportunity to work in several locations owned by the Yard, and we've been very happy with both. The team is great -- they're been very accommodating to our particular space needs, they're always offering members the opportunity to engage and interact, and frankly, they're just very nice people! The Yard had provided value and flexibility at each stage of our company's growth.",
  ];

  let id = 1;

  for (let i = 1; i <= 5; i += 1) {
    const descNumber = Math.floor(Math.random() * 10);

    reviews.push({
      id,
      quietness: generateRating(),
      wifi_speed: generateRating(),
      close_late: generateRating(),
      community: generateRating(),
      accessibility: generateRating(),
      description: descriptions[descNumber],
      user_id: generateRating(),
    });

    id += 1;
  }

  return [reviews, generateRating()];
};

const addAverageRatings = data =>
  data.map(location => {
    location.avg_quietness = generateRating();
    location.avg_wifi_speed = generateRating();
    location.avg_accessibility = generateRating();
    location.avg_community = generateRating();

    return location;
  });

module.exports = {
  getReview,
  addAverageRatings,
};
