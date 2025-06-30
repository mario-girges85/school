const User = require("../models/User");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

//add user endpoint (signup)
const addUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, gender, phone, birthDate, image } = req.body;
    // Basic validation
    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !phone ||
      !birthDate
      // !image
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide name, email, password, gender, phone, birthDate, image",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        // Create new user
        const newUser = new User({
          name,
          email,
          password: hashedPassword, // Note: In production, you should hash the password
          gender,
          phone,
          birthDate,
          image,
        });
        newUser.save();
      })
      .catch((err) => {
        console.log("couldnot hash password\n", err);
      });

    // Return user data (excluding password)
    // const userResponse = {
    //   id: savedUser._id,
    //   name: savedUser.name,
    //   email: savedUser.email,
    //   gender: savedUser.gender,
    //   phone: savedUser.phone,
    //   birthDate: savedUser.birthDate,
    //   image: savedUser.image,
    // };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      // data: userResponse,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//login endpoint

const loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.redirect("/login");
    }

    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.role = user.role;
          return req.session.save((err) => {
            console.log(err);
            console.log("user logged in");
            res.redirect("/");
          });
        } else {
          return res.redirect("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        return res.redirect("/login");
      });
  });
};

// Get all users endpoint
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  loginUser,
};
