const Posts = require("./post.model");

module.exports = {
  //CREATE POST
  async createPost(req, res) {
    try {
      const { title, description, postImage, tags } = req.body;

      if (!title || !description || !postImage || !tags) {
        throw new Error("Some relevant data is missing")
      }

      const newPost = await Posts.create({
        title,
        description,
        postImage,
        tags,
      });

      res.status(201).json({
        message: "Post created Successfully!",
        newPost,
      });
    } catch (error) {
      res.status(500).json({
        message: `Post could not be created! ${error.message}`,
      });
    }
  },

  //READ POSTS
  async getPostData(_, res) {
    try {
      const posts = await Posts.find();
      res.status(201).json({ message: "Success!", posts });
    } catch (error) {
      res.status(500).json({
        message: "Posts were not retrieved",
      });
    }
  },

  async getPostDataById(req, res) {
    try {
      const { postId } = req.params;

      const post = await Posts.findById(postId);

      if(post === null){
        throw new Error("!");
      }

      res.status(201).json({ message: "Success!", post });
    } catch (error) {
      res.status(500).json({
        message: `The post with id=> ${postId} could not be retrieved!`,
      });
    }
  },

  //UPDATE POST
  async updatePostInfo(req, res) {
    const [_, token] = req.headers.authorization.split(" ");
    const { postId } = req.params;

    if (!token) {
      return res.status(401).json({ message: "Missing authorization token!" });
    }

    try {
      const updatedData = req.body;
      const updatedDataWithDate = { ...updatedData, datePosted: new Date() };
      
      const updatedPost = await Posts.findByIdAndUpdate(
        postId,
        updatedDataWithDate,
        { new: true }
      );

      if (updatedPost === null) {
        throw new Error("!");
      }

      res
        .status(201)
        .json({ message: "Post updated successfully!", updatedPost });
    } catch (error) {
      res.status(500).json({
        message: `There is no post with id# => ${postId}${error.message}`,
      });
    }
  },

  //DELETE POST
  async deletePost(req, res) {
    try {
      const { postId } = req.params;
      const postSelectedForDeletion = await Posts.findByIdAndDelete(postId);

      if (postSelectedForDeletion === null) {
        throw new Error("There is no post with that id!");
      }

      res.status(200).json({ message: `Post deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: `The post was not deleted. ${error}` });
    }
  },

  //ADD LIKE

  async addLikes(req, res) {
    try {
      const { postId } = req.params;

      if (!req.body.like) {
        throw new Error("!");
      }

      await Posts.findByIdAndUpdate(postId, {
        $inc: { likes: 1 },
      });

      const updatedPost = await Posts.findById(postId);
      res
        .status(200)
        .json({ message: `Like added. Total likes: ${updatedPost.likes}` });
    } catch (error) {
      res.status(500).json({
        message: `There was an error and we could not process your like ${error}`,
      });
    }
  },

  //COMMENT SUBPLOT
  //CREATE COMMENT
  async addComment(req, res) {
    try {
      const { postId } = req.params;
      const post = await Posts.findById(postId);

      if (!post) {
        throw new Error(`There is no post with and id => ${postId}`);
      }

      const { commenter, comment } = req.body;

      if (!commenter || !comment) {
        throw new Error(`The comment has a missing component`);
      }

      post.comments.push({ commenter, comment, date: new Date() });
      const updatedPost = await post.save();
      res.status(200).json({
        message: `Comment added successfully`,
        comments: updatedPost.comments,
      });
    } catch (error) {
      res.status(500).json({
        message: `There was an error while trying to add the comment. ${error}`,
      });
    }
  },

  //DELETE COMMENT
  async deleteComment(req, res) {
    try {
      const { postId, commentId } = req.params;

      const post = await Posts.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );

      if (!post) {
        throw new Error(`Post with id# => ${postId} not found`);
      }

      res.status(200).json({
        message: `Comment deleted successfully`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `The comment could not be deleted. ${error}` });
    }
  },
};
