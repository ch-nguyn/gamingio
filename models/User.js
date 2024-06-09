const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    unique: [true, "Name already exists"],
    minLength: [4, "Min length 4"],
    maxLength: 20,
  },
  email: {
    type: String,
    unique: [true, "Email already in use"],
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  fullName: {
    type: String,
  },
  photo: {
    type: String,
    default:
      "https://secure.gravatar.com/avatar/be3bb8ab4714145f6cbbceff5a89d68a?s=60&d=mm&r=g",
  },
  address: {
    type: [mongoose.Types.ObjectId],
    ref: "Address",
  },

  phoneNumber: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  isVerify: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("User", userSchema);
