const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../db");

// Loading cloudinary settings and changing multer storage
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// upload.single('image'),
router.route("/").post(upload.array("image"), (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  req.files.map((o) => console.log(o.path, o.filename));
  res.status(200).send("OK");
});

module.exports = router;
