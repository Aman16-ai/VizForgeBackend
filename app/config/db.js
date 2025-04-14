const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
