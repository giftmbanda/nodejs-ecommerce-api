const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const productSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
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
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", productSchema);
