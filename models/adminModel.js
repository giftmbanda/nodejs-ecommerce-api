import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
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
}, { timestamps: true } //to include createdAt and updatedAt
);
export default model("Admin", adminSchema);
