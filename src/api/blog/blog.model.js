const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  blogContent: {
    type: String,
    required: [true, "A blog always needs content"],
  },

  blogImages: {
    type: [String]
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

const Blogs = model("blogs", blogSchema);

module.exports = Blogs;
