const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const cookie = require("cookie");

const defaultImgUrl =
  "https://res.cloudinary.com/han109k/image/upload/v1633536127/insramtag/default_avatar.jpg";

router.route("/register").post((req, res, next) => {
  const { email, fullname, username, password } = req.body;

  console.log(
    `Email: ${email}, Full name: ${fullname}, User name: ${username}, password: ${password}`
  );

  db.query(
    "SELECT * FROM users WHERE email = $1 OR user_name = $2",
    [email, username],
    (err, query) => {
      if (err) next(err);
      if (query.rows.length !== 0) {
        console.log(query);
        console.log("User exists");
        return res.status(401).json({ message: "User already exist" });
      }
    }
  );

  const salt = bcrypt.genSaltSync(10); // 10 => salt rounds
  const hashedPassword = bcrypt.hashSync(password, salt);

  db.query(
    "INSERT INTO users (email, user_name, full_name, password, profile_pic) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [email, username, fullname, hashedPassword, defaultImgUrl],
    (err, user) => {
      if (err) next(err);
      console.log(user);
      const token = jwtGenerator(user.rows[0].user_id);

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("userToken", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          expries: Date.now() + 1000 * 60 * 60 * 24 * 7,
        })
      );
      res.status(201).json({ message: "Registered" });
    }
  );
});

router.route("/login").post((req, res, next) => {
  const { email, password } = req.body;

  console.log(`Email: ${email}, password: ${password}`);

  db.query(
    "SELECT password FROM users WHERE email = $1",
    [email],
    (err, query) => {
      if (err) next(err);
      if (query.rows.length === 0) {
        return res
          .status(401)
          .json({ message: "Password or Email is incorrect" });
      }

      const isPasswordValid = bcrypt.compareSync(
        password,
        query.rows[0].password
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Password or Email is incorrect" });
      }

      const token = jwtGenerator(query.rows[0].user_id);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("userToken", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          expries: Date.now() + 1000 * 60 * 60 * 24 * 7,
          sameSite: false,
          secure: true
        })
      );

      res.status(200).json({ message: "Logged in" });
    }
  );
});

router.route("/logout").get((req, res, next) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("userToken", "null", {
      httpOnly: true,
      maxAge: 1,
      expries: -1,
      sameSite: false,
      secure: true
    })
  );

  res.status(200).json({ message: "Logged out" });
})

router.route("/verify").get(authorize, (req, res, next) => {
  try {
    if (req.user) {
      console.log(req.user);
      return res.status(200).json({ message: "Authorized" });
    }
    res.status(200).json({ message: "Unauthorized" });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
