const QueryKeys = {
  facility: {
    visitedPets: 'facility visited pets',
    visitedUser: 'facility visited user',
    info: 'facility info',
    reviews: 'facilify reviews',
    review: {
      registerComplete: ['facility review register complete'],
    },
    score: 'facility score',
  },
  tags: ['tags'],
  user: {
    getUser: 'get user',
  },
  auth: {},
} as const;

export default QueryKeys;
