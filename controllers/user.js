const User = require("../models/users");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// console.log('Generated JWT Secret:', jwtSecret);

const signUp = async (username, password) => {
  try {

    const userAlready = await User.findOne({ username: username });

    if (userAlready) {
      return {
        message: "user exist already",
        code: 409,
      };
    }
    const newUser = await User.create({
      username: username,
      password: password,
    });
    return {
      code: 200,
      newUser,
    };
  } catch (error) {
    console.log(error);
  }
};
// const express = require('express');
// const User = require('./models/user'); // Import your user model
// const router = express.Router();

// Login route

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username.' });
    }
    
    const isPasswordValid = await user.comparePassword(password);
    console.log(isPasswordValid, password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // User is authenticated, you can generate a JWT token or set a session here
    const token = jwt.sign(
      { user_id: user._id},
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      })

      user.token = token
    res.redirect('/dashboard')
    // res.json({ message: 'Login successful' });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


module.exports = { signUp, login };
