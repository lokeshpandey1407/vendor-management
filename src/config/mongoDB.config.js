const mongoose = require("mongoose");

const connectToMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI).then(() => {
      console.log("Database is connected");
    });
  } catch (err) {
    console.log(err);
  }
};

//Named export
module.exports = { connectToMongoose };
