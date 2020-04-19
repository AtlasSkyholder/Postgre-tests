require('dotenv').config();

const PORT       = process.env.PORT || 8080;
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const db = require('./db.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(db.getUsers);
  res.render("index");
});

app.post("/", db.createUser);


app.listen(PORT, process.env.IP, function(){
  console.log(`Example app listening on port ${PORT}`);
});