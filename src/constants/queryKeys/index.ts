const QueryKeys = {
  auth: {
    getAuthMobile: 'get auth mobile',
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
} as const;

export default QueryKeys;
