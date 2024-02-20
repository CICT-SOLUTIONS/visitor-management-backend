const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "A post title is always needed"],
    maxlength: [100, "A post should not exceed 100 characters length"],
  },

  description: {
    type: String,
    required: [true, "A post description is always needed"],
    maxlength: [1000, "A post should not exceed 1000 characters length"],
  },

  postImage: {
    type: String,
    required: [true, "A post image is always needed"],
  },

  tags: {
    type: [String],
    validate: {
      validator: (tags) => tags.length <= 10,
      message: "There is a tag limit of 10",
    },
    default: ["NoTag"],
  },
  
  datePosted: {
    type: Date,
    default: Date.now(),
  },

  comments: {
    type: [
      {
        commenter: { type: String, required: true },
        comment: { type: String, required: true },
        date: Date,
      },
    ],
    default: [],
  },

  likes: {
    type: Number,
    default: 0,
  },
});

const Posts = model("posts", postSchema);

module.exports = Posts;
