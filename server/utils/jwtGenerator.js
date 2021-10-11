const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_name) {
  const payload = {
    user: user_name,
  };

  return jwt.sign(payload, process.env.jwtkey, { expiresIn: "7d" }); // 7d or 10h
}

module.exports = jwtGenerator;
