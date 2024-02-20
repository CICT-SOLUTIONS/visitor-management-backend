const express = require("express");
const connect = require("./config/database");
const configExpress = require("./config/express");
const routes = require("./routes");
const { formData } = require("./middlewares/formData");

const app = express();
connect();

// Setup
configExpress(app);

// Routes
routes(app);

// Middleware
app.post("/post-image", formData, (req, res) => {
  res.status(200).json({ ...req.body });
});

module.exports = app;
