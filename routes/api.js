const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
var auth = require("../middleware/Auth");
router.use("/auth", require("./auth"));

router.get("/", (req, res) => {
  res.json({ message: "Working Perfectly Lol!!" });
});

router.get("/user", auth, (req, res, next) => {
  const _id = req.user["id"];
  const user = User.find({ _id: _id }, (err, user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "No User Found" });
    }
  });
});

router.get("/users", auth, (req, res, next) => {
  const _id = req.user["id"];
  if (_id === process.env.ADMIN_ID) {
    const users = User.find((err, users) => {
      if (users) {
        res.status(200).json(users);
        return 1;
      } else {
        res.status(401).json({ message: "No Users Found" });
        return 0;
      }
    });
  }
});
module.exports = router;
