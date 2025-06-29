const User = require("../models/User");
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

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // Note: In production, you should hash the password
      gender,
      phone,
      birthDate,
      image,
    });

    const savedUser = await newUser.save();

    // Return user data (excluding password)
    const userResponse = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      gender: savedUser.gender,
      phone: savedUser.phone,
      birthDate: savedUser.birthDate,
      image: savedUser.image,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userResponse,
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    } else {
      console.log(user);
    }
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
