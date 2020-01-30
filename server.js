require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 3000;
const db = require("./models");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
