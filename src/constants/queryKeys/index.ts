const QueryKeys = {
  facility: {
    visitedPets: 'facility visited pets',
    visitedUser: 'facility visited user',
    info: 'facility Info',
  },
  user: {
    getUser: 'get user',
  },
  community: {
    getPosts: 'get community posts',
    getPost: 'get community post',
  },
  comment: {
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
