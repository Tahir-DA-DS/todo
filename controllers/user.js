const User = require("../models/users");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// console.log('Generated JWT Secret:', jwtSecret);

const signUp = async (username, password) => {
  try {
    const hashedPass = await bcrypt.hash(password, 10)

    const userAlready = await User.findOne({username:username})

    if(userAlready){
      return {
        message:"user exist already",
        code:409
      }
    } 
    const newUser = await User.create({username:username, password:hashedPass})
    return {
      code:200,
      newUser
    }
  } catch (error) {
   console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h"
        }
      );
      // save user token
      user.token = token;
      res.status(200).redirect('/home');
    }
  } catch (err) {
    res.status(400).send("Invalid Credentials");
    console.log(err);
  }
};

module.exports = { signUp, login };
