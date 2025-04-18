import Post from '../models/postModel.js';

const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, order = 'desc' } = req.query;

    const queryConditions = {};

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { updatedAt: order === 'asc' ? 1 : -1 },
      lean: true,
      customLabels: {
        totalDocs: 'totalPosts',
        docs: 'posts',
        limit: 'perPage',
        page: 'currentPage',
        totalPages: 'totalPages',
        nextPage: 'next',
        prevPage: 'prev',
        pagingCounter: 'pageStartIndex',
        hasPrevPage: 'hasPrev',
        hasNextPage: 'hasNext',
      },
    };

    const result = await Post.paginate(queryConditions, options);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { getPosts };
