require('dotenv').config();

const PORT       = process.env.PORT || 8080;
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const db = require('./db.js');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", db.createUser);

app.get("/read", (req, res) => {
  console.log(req.body)
  let data = "";
  res.render("read", {email: data});
});

app.post("/read", (req, res) => {

  async function x () {
    let data = await db.findUsers(req.body.name);
    data = data.email;
    return data;
  }
  x().then(data => { 
    res.render("read", {email: data });});
});

app.listen(PORT, process.env.IP, function(){
  console.log(`Example app listening on port ${PORT}`);
});