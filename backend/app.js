require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routers/user");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");

// Routes
app.use("/api/users", userRoutes);

// Basic route
app.use("/", (req, res) => {
  res.json({ message: "Welcome to the Backend API" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => app.listen(process.env.PORT))
  .then(() => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
  .catch((err) => console.error("MongoDB connection error:", err));
