const express = require("express")
const mountRoutes = require("./routes");
const app = express();
require('dotenv').config();

/**
 ** ROUTES
 */
mountRoutes(app);

app.use("*", (req, res) => {
  res.send("<h1>404 Not Found</h1>")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening at port ", port);
})