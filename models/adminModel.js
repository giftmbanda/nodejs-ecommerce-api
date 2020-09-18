const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: /^[0-9]{10}$/,
    },
    resetPasswordLink: {
      data: String,
      default: '',
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

module.exports = mongoose.model("Admin", adminSchema);
