require('dotenv').config();

const PORT       = process.env.PORT || 8080;
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const http = require('http');
const db = require('./db.js');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", db.createUser);

app.get("/read", (req, res) => {
  res.render("read");
});

app.post("/read", (req, res) => {

  (async () => {
    let data = db.findUsers(req.body.name);
    console.log(await data);
  })();
  res.render("read");
});

app.listen(PORT, process.env.IP, function(){
  console.log(`Example app listening on port ${PORT}`);
});