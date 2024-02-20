require("dotenv").config();
const server = require("./app");

const startServer = () => {
  const port = process.env.PORT || 8080;
  const host = "0.0.0.0"; // Bind to all available network interfaces
  server.listen(port, host, () => {
    console.log(`🔷 > App running at http://localhost:${port} < 🔷`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = server;
