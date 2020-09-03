const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

  // _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    match: /^[0-9]{10}$/,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true });
module.exports = mongoose.model("User", userSchema);
