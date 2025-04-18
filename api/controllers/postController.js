import Post from '../models/postModel.js';
import { createError } from '../utils/createError.js';
import { pickAllowedKeys } from '../utils/pickAllowedKeys.js';

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

const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not allowed to create a post'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({ ...req.body, slug });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not allowed to update this post'));
  }

  const allowedUpdates = ['title', 'content', 'image'];
  const updates = pickAllowedKeys(req.body, allowedUpdates);

  if (!req.body.image) {
    delete updates.image;
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, { $set: updates }, { new: true, runValidators: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not allowed to delete this post'));
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};

export { getPosts, createPost, updatePost, deletePost };
