const mongoose = require("mongoose");
console.log("Connecting to database... with env", process.env.DB_URL);
const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
