const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/User.Model");

//nodemailer
const sendEmail = require("../nodemailer");

const app = express();

const UserRouter = express.Router();
UserRouter.use(express.json());

// register route
UserRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    let user = await UserModel.find({ email });
    console.log(user);

    if (user.length > 0) {
      res.send(`user already registered`);
    } else {
      try {
        bcrypt.hash(password, 6, async function (err, hash) {
          const user = new UserModel({
            name,
            email: email,
            password: hash,
          });
          console.log(user);
          await user.save();
          res.status(201).send(`user Registered successfully`);
        });
      } catch (error) {
        console.log(error.message);
        res.status(404).send(`error in registration: ${error.message}`);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send(`error in registration: ${error.message}`);
  }
});

// login user

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.findOne({ email: email });
    console.log(user);

    const hashed_password = user?.password;

    if (user) {
      bcrypt.compare(password, hashed_password, async function (err, result) {
        if (result) {
          // sending otp

          const otp = Math.round(Math.random() * 9999);
          console.log(otp);

          sendEmail({
            email: email,
            subject: "Login with otp Thanks!",
            body: `OTP ${otp}`,
          })
          const token = jwt.sign({ user_id: user.id }, "chat", {
            expiresIn: "7d",
          });
          console.log(token);
          res.status(201).send({
            token,
            message: `user login done successfully`,
            user_id: user.id,otp
          });
        } else {
          console.log(`user not found`);
          res.send(`user not found`);
        }
      });
    } else {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send(`error in login: ${error.message}`);
  }
});

module.exports = UserRouter;
