const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      match: /^[0-9]{10}$/,
    },
    createdAt: {
      type: Date,
      required: false,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);
module.exports = mongoose.model("User", userSchema);
