const Category  = require("../models/cateModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createCategory = async (req, res, next) => {
  const category = await Category.findOne({name: req.body.name})
  if(category) return res.status(400).send('category already exist')

  const newCategory = new Category ({ name: req.body.name });

  try {
    const savedCategory= await newCategory.save();
    res.status(200).send({message: "categories was created", category: savedCategory});
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getCategories = (req, res, next) => {

  Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "product",
        },
      },

      {
        $project: {
          name: 1,
          totalProducts: { $size: "$product" },
          product: { $slice: ["$product", 2] },
        },
      },
    ])
    .exec()
    .then((products) => {
      res.status(200).json({
        count: products.length,
        categories: products,
      });
    })
    .catch((error) => {
      res.send(error);
      // next(error);
    });
};
