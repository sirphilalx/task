// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single user by ID
router.get("/users/:id", getUser, (req, res) => {
  res.json(res.user);
});

// POST create a new user
router.post("/users", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    // Add other fields as needed
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a user by ID
router.put("/users/:id", getUser, async (req, res) => {
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  // Update other fields as needed

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user by ID
router.delete("/users/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH switch role of a user by ID
router.patch("/users/:id/switch-role", getUser, async (req, res) => {
  if (res.user.role === "user") {
    res.user.role = "admin";
  } else {
    res.user.role = "user";
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to get a user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;
