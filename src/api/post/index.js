const router = require("express").Router();
const postController = require("./post.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router
  .route("/")
  .get(postController.getPostData)
  .post(authMiddleware, postController.createPost);

router
  .route("/:postId")
  .get(postController.getPostDataById)
  .put(authMiddleware, postController.updatePostInfo)
  .delete(authMiddleware, postController.deletePost);

router.route("/:postId/like").put(postController.addLikes);

router.route("/:postId/comment").post(postController.addComment);

router
  .route("/:postId/:commentId")
  .delete(authMiddleware, postController.deleteComment);
//   .put(postController.updateComment)
//   .get(postController.getAllComments)

module.exports = router;
