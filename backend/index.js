require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const userRoutes = require("./routers/user");

const app = express();
const store = new MongoDBStore({
  uri: "mongodb+srv://mario85:stopthisshit@cluster0.zpxocbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  collection: "sessions",
});
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Middleware
app.use(
  cors({
    origin: [
      "https://school-6i7h.vercel.app/",
      "http://localhost:5173", // Your local development server
      "http://localhost:3000", // Alternative local port
      "https://school-6i7h.vercel.app", // Your deployed frontend (when you deploy it)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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
