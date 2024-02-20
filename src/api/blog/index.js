const router = require("express").Router();
const blogController = require("./blog.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router
  .route("/")
  .post(authMiddleware, blogController.createBlog)
  .get(blogController.getBlogData);

router
  .route("/:blogId")
  .get(blogController.getBlogDataById)
  .put(authMiddleware, blogController.updateBlogInfo)
  .delete(authMiddleware, blogController.deleteBlog);

router.route("/:blogId/like").put(blogController.addLikes);

router.route("/:blogId/comment").post(blogController.addComment);

router
  .route("/:blogId/:commentId")
  .delete(authMiddleware, blogController.deleteBlogComment);

module.exports = router;
