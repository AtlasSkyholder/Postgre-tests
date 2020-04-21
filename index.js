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

app.post("/", (req, res) => {
  const {email , name} = req.body;
  db.createUser(name, email);
  res.render("index");
});

app.get("/read", (req, res) => {
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

app.get("/update", (req, res) => {
  let data = "";
  res.render("update", {email: data});
});

app.post("/update", (req, res) => {

  async function x () {
    const {email , name} = req.body;
    await db.updateUsers(name, email);
    return name;
  }
  x().then(name => { 
    
    let data = db.findUsers(name);
    return data;
    
    }).then(data => { 
    data = data.email; 
    res.render("update", {email: data })});
});

app.get("/delete", (req, res) => {
  let data = "";
  res.render("delete", {list: data});
});

app.post("/delete", (req, res) => {

  async function x () {
    const name = req.body.name;
    await db.deleteUsers(name);
  }
  x().then(() => { 
    
    let data = db.getUsers();
    return data;
    
    }).then(data => { 
    data = JSON.stringify(data); 
    res.render("delete", {list: data })});
});

app.listen(PORT, process.env.IP, function(){
  console.log(`Example app listening on port ${PORT}`);
});