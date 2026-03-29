const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw Error("Please define MONGO_URI in the .env file");
}

function connectToDB() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`Database connected successfully : ${MONGO_URI}`);
    })
    .catch((err) => {
      console.error("Unable to connect to database : ", err);
    });
}

module.exports = connectToDB;
