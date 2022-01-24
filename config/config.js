const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongodb Database Connected!`.bgCyan.white);
  } catch (error) {
    console.log(`error, ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
