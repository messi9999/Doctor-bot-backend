const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const { title } = require("process");
const artRouter = require("./routes/article");
const paymentRouter = require("./routes/payment");

const paymentRouter1 = require("./routes/payment1");

const app = express();
app.use(cors());
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
// app.get("/", async (req, res) => {
//   res.send({ result: "Hello" });
// });

//Route for create articles
app.use("/api/article", artRouter);

//Route for payment
app.use("/api/payment", paymentRouter);

/////////////
app.use("/api/payment1", paymentRouter1);

//MariaDB database connection
const config = require("./config/db.config.js");
const mariadb = require("mariadb");

const db = require("./models");
const Role = db.role;

const pool = mariadb.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  connectionLimit: 5
});

async function createDatabase() {
  let conn;
  console.log("!!!!!!!!!!!!!!!!!!!!!");
  try {
    conn = await pool.getConnection();
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS ${config.DB}`,
      function (err, results) {
        console.log("~~~~~~~~~~~~~~~~~~~Created new data");
        console.log(results);
        console.log(err);
        `1`;
      }
    );
  } catch (err) {
    console.log("mariadb error")
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });

// createDatabase().then(() => {
//   db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and Resync Db");
//     initial();
//   });
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }

// routes

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(5000);
