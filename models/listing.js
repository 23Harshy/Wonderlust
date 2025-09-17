const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Listing Schema
const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  location: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,

      ref: "Review",
    },
  ],
});

// Create the Listing model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
