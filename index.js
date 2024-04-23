const express = require('express');
const InitiateMongoServer = require("./config/db");
const bodyParser = require("body-parser");
const user = require("./routes/user");

InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});