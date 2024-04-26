const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.db_url);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
