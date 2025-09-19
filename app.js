const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const ExpressError = require("./utils/expressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

// MongoDB connection
const mongoUrl = "mongodb://127.0.0.1:27017/wonderlust";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB Connection Error:", err));

// App configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.send("I am root"));

app.use("/listings", listings);

app.use("/listings/:id/reviews", reviews);
// All route handlers here...

//404 handler
//app.all("*", (req, res, next) => {
//  next(new ExpressError(404, "page not found!"));
//});

// Error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  //res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message });
});

// Server start
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
