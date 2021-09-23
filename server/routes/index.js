const users = require("./users");

module.exports = app => {
  app.use("/v1", users);
}