require("dotenv").config();
const jwt = require("jsonwebtoken");

const cookieJwtauth = (req, res, next)=>{
  const token = req.cookies.token
  try {
    const decodedToken  = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken.user
    req.userId = decodedToken.user._id
    next()
  } catch (error) {
    console.log(error);
    res.clearCookie("token")

    return res.redirect('/')
  }
}


module.exports = cookieJwtauth;
