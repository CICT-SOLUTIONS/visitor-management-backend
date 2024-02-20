const router = require("express").Router();
const adminController = require("./admin.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.route("/").get(adminController.getUserData);
router.route("/signup").post(adminController.signUp);
router.route("/signin").post(adminController.signIn);

router
  .route("/:userId")
  .put(authMiddleware, adminController.updateUserInfo)
  .delete(authMiddleware, adminController.deleteUser);

module.exports = router;
