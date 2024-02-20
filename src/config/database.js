const mongoose = require("mongoose");

const connect = () => {
  const mongoUri = process.env.MONGO_DB_URI;

  mongoose.connect(mongoUri);

  mongoose.connection.once("open", () => {
    console.log("Connection with mongoDB successful!");
  });
  
  mongoose.connection.on("error", (error) => {
    console.log("Something went wrong", error);
  });

  return mongoose.connection;
};

module.exports = connect;
