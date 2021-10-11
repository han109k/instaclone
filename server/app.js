require("dotenv").config();
const express = require("express");
const mountRoutes = require("./routes");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Debuggin purposes
app.use(morgan("common"));
// Enable Cross Origin Policy
app.use(cors(corsOptions));
// Parsing incoming requests with JSON payloads
app.use(express.json());
//* Parsing request body
app.use(express.urlencoded({ extended: true }));

/**
 ** ROUTES
 */
mountRoutes(app);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Something is broken!" });
  next();
});

app.use("*", (req, res) => {
  res.status(404).send({ message: "Resource Not Found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening at port ", port);
});
