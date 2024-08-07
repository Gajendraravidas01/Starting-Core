import mongoose from "mongoose";
import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

const RegisterUser = async (req, res) => {
  const { email, username, password } = req.body;
  // console.log(req.body);
  if (!email || !password || !username) {
    return res.status(404).json({
      message: "email or password or username is required",
    });
  }
  try {
    const existuser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existuser) {
      return res.status(400).json({
        message: "User already exist!",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedpassword });
    await newUser.save();

    return res.status(200).json({
      message: "user created successfully",
    });
  } catch (error) {
    return (
      res.status(400).json({
        message: "something went wrong on creating user!",
      }),
      console.log(error)
    );
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password);
    if (!email && !password) {
      return res.status(400).json({
        message: "email or password is required!",
      });
    }

    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "user doesn't exiest. please write valid email or password",
      });
    }

    const Ismatch = await bcrypt.compare(password, user.password);
    // console.log(Ismatch);
    if (Ismatch === false) {
      return res.status(400).json({
        message: "Invalide credentials",
      });
    }

    const jwtToken = jwt.sign(
      {
        _id: user._id,
        email: email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    // console.log(jwtToken);  

    const loggedInUser = await User.findById(user._id).select("-password");
    // console.log(loggedInUser);
    req.user = loggedInUser;
    // console.log(req.user)
    return res.status(200).json({
      jwtToken,
      user : loggedInUser,
      message: "user logged in successfully",
    });
  } catch (error) {
    return res.status(400).json({
        message : "Unable to login!"
    }), console.log(error);
  }
};


export { RegisterUser, LoginUser };
