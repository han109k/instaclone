const express = require("express");
const router = express.Router();
const db = require("../db");
const authorize = require("../middleware/authorize");
const asyncCatch = require("../utils/asyncCatch");

router.route("/:username").get(
  asyncCatch(async (req, res, next) => {
    const user = await db.query(
      "SELECT user_name, full_name, profile_pic, bio, posts, followers, following FROM users WHERE user_name = $1",
      [req.params.username]
    );

    res.status(200).json(user.rows[0]);
  })
);

module.exports = router;
