const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Plz filled the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else {
      const user = new User({
        name,
        email,

        password,
      });

      await user.save();
      res.status(200).json({
        success: true,
        message: "Register success",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });

    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0].Id,
      };
      res.status(200).send(currentUser);
    } else {
      res.status(400).json({
        message: "Login Failed",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Something Went wrong",
    });
  }
});

//GET ALL USERS :ADMIN
router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

//DELETE USER : ADMIN
router.post("/deleteuser", async (req, res) => {
  const { userId } = req.body;
  try {
    await User.findOneAndDelete({ _id: userId });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

module.exports = router;
