const Product = require("../models/prodModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createProduct = async (req, res, next) => {
  const product = new Product({
    category: req.body.categoryId,
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
    quantity: req.body.quantity,
  });

  //productm.init();
  try {
    savedProduct = await product.save();
    return res.status(200).send({ message: "User created successfully!", product: savedProduct });
  } catch (error) {
    if (error.code === 11000)
      return res.status(200).send({ message: "product already exist" });
    return res.status(400).send({ error: "unable to create product", error });
  }
};

exports.getProducts = (req, res, next) => {
  var pageNo = parseInt(req.query.pageNo);

  var size = 3;
  const query = {};
  if (pageNo < 0 || pageNo == 0) {
    return res.send({ error: true, message: "inavlid page number" });
  }
  query.skip = size * (pageNo - 1);
  //query.limit = size;

  Product
    .find({}, {}, query)
    .select("-_id category name price productImage")
    .populate("category", "-_id name")
    .exec()
    .then((products) => {
      const response = {
        count: products.length,
        products: products.map((product) => {
          return {
            name: product.name,
            price: product.price,
            productImage: product.productImage,
            category: product.category.name,
            addedDate: product.createdAt,
          };
        }),
      };
      return res.status(200).send({
        count: products.length,
        products: products,
      });
    })
    .catch((error) => {
      return res.send(error);
      // next(error);
    });
};
