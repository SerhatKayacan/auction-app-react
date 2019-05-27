const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// connect to database
const db = require("./config/keys").mongoURL;
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

// create schema
const UserSchema = new Schema({
  number: {
    type: Number,
    required: true
  }
});
const Users = mongoose.model("users", UserSchema);

// GET api/users
app.get("/api/users", (req, res) => {
  Users.find().then(users => res.json(users));
});

//PUT api/users/:id
app.put("/api/users/:id", function(req, res, next) {
  Users.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function() {
      Users.findOne({ _id: req.params.id }).then(function(user) {
        res.send(user);
      });
    })
    .catch(next);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
