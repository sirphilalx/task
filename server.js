const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// importing user models
const userModel = require("./models/userModel");
// using the express in the middleware
const app = express();
app.use(express.json());

// logic for registering users
app.post("/register", (req, res) => {
  let user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, async (err, hpass) => {
        if (!err) {
          user.password = hpass;
          try {
            let doc = await userModel.create(user);
            res.status(201).send({ message: "user registration successful" });
          } catch (error) {
            console.log(err);
            res.status(500).send({ message: "user registration failed" });
          }
        }
      });
    }
  });
});

// logic for logging in users
app.post("/login", async (req, res) => {
  let userCred = req.body;
  try {
    const user = await userModel.findOne({ email: userCred.email });
    if (user !== null) {
      bcrypt.compare(userCred.password, user.password, (err, success) => {
        if (success) {
          jwt.sign(
            { email: userCred.email },
            "cooperative-app",
            (err, token) => {
              if (!err) {
                res.send({ message: "Login successfully", token: token });
              }
            }
          );
        } else {
          res.status(403).send({ message: "Incorrect Password" });
        }
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.log("");
    res.send({ message: "something went wrong" });
  }
});
// connection to database
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error.message);
});

db.once("open", () => {
  console.log("connected to database successfully");
});

// Listening to the port for a request
app.listen(9000, () => {
  console.log("server listening on port 9000");
});
