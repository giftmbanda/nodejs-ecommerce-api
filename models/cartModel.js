const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);

module.exports = mongoose.model("Cart", cartSchema);
