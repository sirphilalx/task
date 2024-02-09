const mongoose = require("mongoose");
const userModel = require("./userModel");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
