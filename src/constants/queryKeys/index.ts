const QueryKeys = {
  facility: {
    location: 'location',
    coordinate: 'coordinate',
    facilityList: 'facility list',
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
  community: {
    getPosts: 'get community posts',
    getPost: 'get community post',
    deletePost: 'delete community post',
  },
  comment: {
    getBestComments: 'get best comments',
    getComments: 'get comments',
    deleteComment: 'delete comment',
  },
  recomment: {
    getRecomments: 'get recomments',
    deleteRecomment: 'delete recomment',
  },
  auth: {},
} as const;

export default QueryKeys;
