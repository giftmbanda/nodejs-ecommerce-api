const categories = require("../models/cateModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.saveCategory = async (req, res, next) => {
  // const cart = await Product.findOne({name:req.body.name})
  // if(!name) return res.status(400).send('product  is not found')

  const ccat = new categories({
    //  _id: mongoose.Types.ObjectId(),
    name: req.body.name,
  });

  try {
    const savedcart = await ccat.save();
    res.send({
      message: "categories was created",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getcat = (req, res, next) => {
  categories
    .find()
    .select("_id product quantity")
    .populate("product", "_id name price")
    .exec()
    .then((orders) => {
      res.status(200).json({
        count: orders.length,
        orders: orders,
      });
    })
    .catch((error) => {
      next(error);
    });
};

// function createOrder(req) {
//   return new Cart({
//     //  _id: mongoose.Types.ObjectId(),
//     product: req.body.productId,
//     quantity: req.body.quantity,
//   });
// }
