const User = require("../model/User/User");
const JWT_SECERT = "AMAN$44";
const jwt = require("jsonwebtoken");
const verifyTokenMiddleware = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    const token = bearer.split(" ")[1];
    if (!token) {
      throw new ErrorProvider(401, false, "Token invalid");
    }

    const data = jwt.verify(token,JWT_SECERT);
    console.log(data);
    const user = await User.findOne({ _id: data.user.id }).select('-password');
    if (!user) {
      throw new ErrorProvider(404, false, "User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyTokenMiddleware;
