const PORT       = process.env.PORT || 8080;
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();

const { Pool } = require('pg');
const dbParams = require('./db.js');
const db = new Pool(dbParams);
db.connect();

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/", (req,res) => {
  let x = req.body;
  console.log(x);
});


app.listen(PORT, process.env.IP, function(){
  console.log(`Example app listening on port ${PORT}`);
});