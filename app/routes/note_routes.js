//mongodb requires not just an id as a string(so we can't just use req.params.id from the url), instead it needs id as an obejct
const ObjectID = require("mongodb").ObjectID;
module.exports = function (app, db) {
  app.get("/notes/:id", (req, res) => {
    //"Read" route
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("notes").findOne(details, (err, item) => {
      if (err) {
        res.send({ "error ": err });
      } else {
        res.send(item);
      }
    });
  });
  app.get("/notes", (req, res) => {
    // to read all records in the mongodb colletcion
    db.collection("notes")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });

  app.put("/notes/:id", (req, res) => {
    //"Put or update" route
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection("notes").update(details, note, (err, item) => {
      if (err) {
        res.send({ "error ": err });
      } else {
        res.send(item);
      }
    });
  });

  app.post("/notes", (req, res) => {
    //"Create Route"
    const note = { text: req.body.body, title: req.body.title };
    db.collection("notes").insert(note, (err, result) => {
      //collection name is notes, database name is being sent from server.js
      if (err) {
        res.send({ "error ": err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete("/notes/:id", (req, res) => {
    //"Delete" route
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("notes").remove(details, (err) => {
      if (err) {
        res.send({ "error ": err });
      } else {
        res.send("Note " + id + " deleted");
      }
    });
  });
};
