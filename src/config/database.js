const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  // mongodb+srv://mom:<password>@cluster0.8gbdb.mongodb.net/?retryWrites=true&w=majority
  mongodb://localhost:27017/bill

  // mongodb+srv://mom:mommy@cluster0.8gbdb.mongodb.net/fintech?retryWrites=true&w=majority
  mongoose
    .connect("mongodb://localhost:27017/bill", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
