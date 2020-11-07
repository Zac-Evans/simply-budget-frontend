const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors());

const Sequelize = require("sequelize");
app.use(cookieParser());

const myDatabase = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./models");
const apiRoutes = require("./routes/apiRoutes");
app.use("/", apiRoutes);

require("./models/index");
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}.`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
