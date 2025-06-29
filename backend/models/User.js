const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 6,
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
    default: "male",
  },
  phone: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "teacher"],
    default: "user",
  },
  classid: {
    type: String,
    // required: true,
    // default: "1",
  },
  exams: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
