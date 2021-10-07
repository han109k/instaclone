const express = require("express");
const router = express.Router();
const db = require("../db");

router.route("/:username").get((req, res, next) => {
  db.query(
    "SELECT * FROM users WHERE user_name = $1",
    [req.params.username],
    (error, user) => {
      error ? next(error) : res.json({ users: user.rows });
    }
  );
});

module.exports = router;