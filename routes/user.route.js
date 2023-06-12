const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlackModel } = require("../model/black.model");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { email, password, age, city, name, is_married } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.json({ msg: err.message });
      } else {
        const newuser = new UserModel({
          email,
          name,
          password: hash,
          age,
          city,
          is_married,
        });
        await newuser.save();
        res.json({ msg: "userAdded", User });
      }
    });
  } catch (error) {
    res.json({ err: error.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, username: user.name },
            "teja",
            {
              expiresIn: "7d",
            }
          );
          const refreshtoken = jwt.sign(
            { userID: user._id, username: user.name },
            "redy",
            {
              expiresIn: "2m",
            }
          );
          res.status(200).json({ msg: "loggedin", token, refreshtoken });
        }
      });
    } else {
      res.status(400).json({ msg: "wrong credenials" });
    }
  } catch (error) {}
});

userRouter.get("/logout", async (req, res) => {
  let token = req.headers.authentication.split(" ")[1];
  let black = new BlackModel({ token });
  await black.save();
  res.send({ msg: "logout sucessfil" });
});

module.exports = {
  userRouter,
};
