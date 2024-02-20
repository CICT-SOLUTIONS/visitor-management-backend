const router = require("express").Router();
const userController = require("./user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.route("/").get(userController.getUserData);
router.route("/signup").post(userController.signUp);
router.route("/signin").post(userController.signIn);

// router
  // .route("/:userId")
  // .put(authMiddleware, adminController.updateUserInfo)
  // .delete(authMiddleware, adminController.deleteUser);

module.exports = router;
