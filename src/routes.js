const admin = require("./api/admin");
const posts = require("./api/post");
const blogs = require("./api/blog");

const routes = (app) => {
  app.use("/api/admin", admin);
  app.use("/api/posts", posts);
  app.use("/api/blogs", blogs);
};

module.exports = routes;
