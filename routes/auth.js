const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const router = express.Router();

const hashpassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparepassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

router.get("/", (req, res) => {
  res.json({ message: "Working Perfectly Lol!!" });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = hashpassword(password);
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User Exists Already" });
  } else {
    // Insert the new user if they do not exist yet
    user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.json({ message: "User Created Successfully" });
  }
});

// JWT verification token is just for testing purpose, Should change in Production

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) return console.error(err);
    if (!user) return res.json({ message: "User not found" });
    if (!comparepassword(password, user.password))
      return res.json({ message: "Password is incorrect" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token: token,
    });
  }).select("+password");
});

module.exports = router;
