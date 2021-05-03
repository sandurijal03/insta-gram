const { Schema, model } = require('mongoose');

const {
  Types: { ObjectId },
} = Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  likes: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      text: String,
      postedBy: {
        type: ObjectId,
        ref: 'User',
      },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

const Post = model('Post', postSchema);

module.exports = Post;
