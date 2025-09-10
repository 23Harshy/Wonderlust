const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";

// define main function to connect
async function main() {
  await mongoose.connect(mongo_url);
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
});

const initDB =  async() => {
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initDB();