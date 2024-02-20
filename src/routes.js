const admin = require("./api/admin");
const user = require("./api/user");


const routes = (app) => {
  app.use("/api/admin", admin);
  app.use("/api/user", user);

};

module.exports = routes;
