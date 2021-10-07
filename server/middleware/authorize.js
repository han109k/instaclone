const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    if(!req.headers.cookie) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const cookies = cookie.parse(req.headers.cookie);

    const payload = jwt.verify(cookies.userToken, process.env.jwtkey);

    console.log("Payload", payload);

    req.user = payload.user;

    next();
  } catch (error) {
    console.error("Error @authorize service", error);
    next(error);
  }
};
