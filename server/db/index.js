const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "asd1234",
  host: "localhost",
  port: 5432,
  database: "insta",
});

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// }

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log("executed query", { text, duration, rows: res.rowCount });
      callback(err, res);
    });
  },
};
