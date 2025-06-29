const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const rootDir = require("../functions/rootdir");
const {
  addUser,
  getAllUsers,
  loginUser,
} = require("../controllers/userController");

// Middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Add user endpoint (signup)
router.post("/add", addUser);

//login endpoint
router.post("/login", loginUser);

// Get all users endpoint
router.get("/", getAllUsers);

module.exports = router;
