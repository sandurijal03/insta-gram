const { Schema, model } = require('mongoose');

const {
  Types: { ObjectId },
} = Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
});

const User = model('User', userSchema);
module.exports = User;
