const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    console.log("Headers :", req.headers);
    if(!req.headers.cookie) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const cookies = cookie.parse(req.headers.cookie);

    console.log("Cookie :", cookies);

    const payload = jwt.verify(cookies.userToken, process.env.jwtkey);

    req.user = payload.user;

    next();
  } catch (error) {
    console.error("Error @authorize service", error);
    next(error);
  }
};
