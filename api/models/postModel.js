import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const isValidURL = (url) => {
  const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
  return urlRegex.test(url);
};

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      validate: {
        validator: (value) => /^[a-zA-Z0-9çÇğĞıİöÖşŞüÜ\s.,!?;:()'"-]+$/.test(value),
        message: 'Title can only contain letters, numbers, punctuation, and spaces',
      },
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      validate: {
        validator: (value) => /^[a-zA-Z0-9çÇğĞıİöÖşŞüÜ\s.,!?;:()'"-]+$/.test(value),
        message: 'Content can only contain letters, numbers, punctuation, and spaces',
      },
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      validate: {
        validator: isValidURL,
        message: 'Image must be a valid URL ending with .png, .jpg, .jpeg, .gif, or .webp',
      },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);

export default Post;
