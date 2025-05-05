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

const getPost = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug }).lean();

    if (!post) {
      return next(createError(404, 'Post not found.'));
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const getAdjacentPosts = async (req, res) => {
  const { slug } = req.params;

  try {
    const currentPost = await Post.findOne({ slug });

    if (!currentPost) {
      return next(createError(404, 'Post not found.'));
    }

    const previousPost = await Post.findOne({ createdAt: { $lt: currentPost.createdAt } }).sort({ createdAt: -1 });

    const nextPost = await Post.findOne({ createdAt: { $gt: currentPost.createdAt } }).sort({ createdAt: 1 });

    res.status(200).json({
      previousPost,
      nextPost,
    });
  } catch (error) {
    next(error);
  }
};

const getSlugs = async (req, res, next) => {
  try {
    const posts = await Post.find({}, 'slug');
    const slugs = posts.map((post) => post.slug);
    res.json(slugs);
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

export { getPosts, getPost, getAdjacentPosts, getSlugs, createPost, updatePost, deletePost };
