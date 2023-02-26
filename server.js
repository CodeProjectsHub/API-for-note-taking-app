const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express(); //initialize app as an instance of the express framework
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

// require("./app/routes")(app, {});
// app.listen(port, () => {
//   console.log("We are live on " + port);
// });

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);

  database = database.db("notable"); //must specify the name of database as this gets sent to the note_routes.js as argument

  require("./app/routes")(app, database);
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});
