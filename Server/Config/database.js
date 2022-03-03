const mongoose = require('mongoose');

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/carsDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, () =>
      console.log("connected"));
  } catch (error) {
    console.log("could not connect");
  }
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = connectDB;