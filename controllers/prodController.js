const Product = require("../models/prodModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createProduct = async (req, res, next) => {

  const newProduct = new Product({
    category: req.body.categoryId,
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
    quantity: req.body.quantity,
  });

  Product.init();
  newProduct.save((err, savedProduct) => {
    if (err) {
      if (err.code === 11000)
        return res.status(200).send({ message: "product already exist" });
      return res.status(400).send({ error: "unable to create product", error });
    }
    return res.status(200).send({ message: "User created successfully!", product: savedProduct });
  });
};

exports.getProducts = (req, res, next) => {
  const pageNo = parseInt(req.query.pageNo);

  const size = 3;
  const query = {};
  if (pageNo < 0 || pageNo == 0) {
    return resres.status(200).send({ error: true, message: "inavlid page number" });
  }
  //query.skip = size * (pageNo - 1);
  //query.limit = size;

  Product.find({}, {}, query)
    .select("category name price productImage createdAt")
    .populate("category", "-_id name")
    .exec((err, products) => {
      if (err) return res.status(400).send({ message: "showing order", err });
      return res.status(200).send({ message: "showing all orders in the cart", products });
    });
};
