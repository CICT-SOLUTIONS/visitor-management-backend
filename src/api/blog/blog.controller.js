const Blogs = require("./blog.model");

module.exports = {
  async createBlog(req, res) {
    try {
      const { blogContent, blogImages, tags } = req.body;

      if (!blogContent || !blogImages || !tags) {
        throw new Error("Some relevant data is missing");
      }

      const newBlog = await Blogs.create({
        blogContent,
        blogImages,
        tags,
      });

      res.status(201).json({
        message: "Blog created Successfully!",
        newBlog,
      });
    } catch (error) {
      res.status(500).json({
        message: `Blog could not be created! ${error.message}`,
      });
    }
  },

  async getBlogData(_, res) {
    try {
      const blogs = await Blogs.find();
      res.status(201).json({ message: "Success!", blogs });
    } catch (error) {
      res.status(500).json({
        message: `Blogs could not be retrieved!`,
      });
    }
  },

  async getBlogDataById(req, res) {
    try {
      const { blogId } = req.params;
      const blog = await Blogs.findById(blogId);

      if (blog === null) {
        throw new Error("!");
      }

      res.status(201).json({ message: "Success!", blog });
    } catch (error) {
      res.status(500).json({ message: `Blog could not be retrieved!` });
    }
  },

  async updateBlogInfo(req, res) {
    const [_, token] = req.headers.authorization.split(" ");
    const { blogId } = req.params;

    if (!token) {
      return res.status(401).json({ message: "Missing authorization token!" });
    }

    try {
      const updatedData = req.body;
      const updatedDataWithDate = { ...updatedData, datePosted: new Date() };

      const updatedBlog = await Blogs.findByIdAndUpdate(
        blogId,
        updatedDataWithDate,
        { new: true }
      );

      if (updatedBlog === null) {
        throw new Error("There is no blog with that Id");
      }

      res
        .status(201)
        .json({ message: "Blog updated successfully!", updatedBlog });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Blog could not be updated${error.message}` });
    }
  },

  async deleteBlog(req, res) {
    try {
      const { blogId } = req.params;
      const blogSelectedForDeletion = await Blogs.findByIdAndDelete(blogId);

      if (blogSelectedForDeletion === null) {
        throw new Error("There is no blog with that id!");
      }

      res.status(200).json({ message: `Blog deleted successfully` });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Blog could not be deleted! ${error.message}` });
    }
  },

  async addLikes(req, res) {
    try {
      const { blogId } = req.params;

      if (!req.body.like) {
        throw new Error("!");
      }

      await Blogs.findByIdAndUpdate(blogId, {
        $inc: { likes: 1 },
      });

      const updatedBlog = await Blogs.findById(blogId);
      res
        .status(200)
        .json({ message: `Like added. Total likes: ${updatedBlog.likes}` });
    } catch (error) {
      res.status(500).json({
        message: `There was an error and we could not process your like ${error}`,
      });
    }
  },

  async addComment(req, res) {
    try {
      const { blogId } = req.params;
      const blog = await Blogs.findById(blogId);

      if (!blog) {
        throw new Error(`There is no blog with and id => ${blogId}`);
      }

      const { commenter, comment } = req.body;

      if (!commenter || !comment) {
        throw new Error(`The comment has a missing component`);
      }

      blog.comments.push({ commenter, comment, date: new Date() });
      const updatedBlog = await blog.save();
      res.status(200).json({
        message: `Comment added successfully`,
        comments: updatedBlog.comments,
      });
    } catch (error) {
      res.status(500).json({
        message: `There was an error while trying to add the comment. ${error}`,
      });
    }
  },

  async deleteBlogComment(req, res) {
    try {
      const { blogId, commentId } = req.params;

      const blog = await Blogs.findOneAndUpdate(
        { _id: blogId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );

      if (!blog) {
        throw new Error(`Blog or comment id's do not match the content in the db`);
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
