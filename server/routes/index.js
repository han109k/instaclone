const users = require("./users");
const posts = require("./posts");
const accounts = require("./accounts");

module.exports = (app) => {
  app.use("/v1", users);
  app.use("/v1/post", posts);
  app.use("/v1/accounts", accounts);
};
