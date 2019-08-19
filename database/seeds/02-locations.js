exports.seed = knex =>
  knex.schema.raw('TRUNCATE TABLE locations, reviews CASCADE').then(() =>
    knex('locations').insert([
      {
        name: 'SPAR Ilupeju',
        description: 'A spar to code in.',
        image_url: 'https://image.flaticon.com/icons/svg/201/201559.svg',
        address:
          '31, Ilupeju Mall, 33 Town Planning Way, Ilupeju 100252, Lagos',
        latitude: '6.553909',
        longitude: '3.3663045',
      },
      {
        name: 'Domino"s Pizza',
        description: 'code and pizza.',
        image_url: 'https://image.flaticon.com/icons/svg/201/201559.svg',
        address: '340/344 Ikorodu Rd, Anthony, Lagos',
        latitude: '6.5663896',
        longitude: '3.3662124',
      },
      {
        name: 'Babacorvee Plaza',
        description: 'A cool spot to code in.',
        image_url: 'https://image.flaticon.com/icons/svg/201/201559.svg',
        address: 'Babacorvee Plaza, Onipanu, 55 Shipeolu St, Somolu, Lagos',
        latitude: '6.5400607',
        longitude: '3.3647819',
      },
      {
        name: 'Chicken Republic',
        description: 'A fast food for work.',
        image_url: 'https://image.flaticon.com/icons/svg/201/201559.svg',
        address: '10 Ikorodu Rd, Yaba, Lagos',
        latitude: '6.517845',
        longitude: '3.3667155',
      },
      {
        name: 'Vintage Suites',
        description: 'Work away from this place',
        image_url: 'https://image.flaticon.com/icons/svg/201/201559.svg',
        address: '15c Akinhanmi St, Surulere, Lagos',
        latitude: '6.5152371',
        longitude: '3.3629375',
      },
    ]),
  );
