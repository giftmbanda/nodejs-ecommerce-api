const Cart = require("../models/cartModel");
const Product = require("../models/prodModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.savecart = async (req, res, next) => {
  // Cart.findOne({product: req.body.productId}, (err, cart) => {
  //     cart.items.push({
  //         item: req.body.product_id,
  //         price: parseFloat(req.body.priceValue),
  //         quantity: parseInt(req.body.quantity)
  //     });

  //     cart.total = (cart.total + parseFloat(req.body.price)).toFixed(2);

  //     cart.save((err) => {
  //         if (err) return (err);
  //         return res.redirect('/cart');
  //     })

  // });
  const cart = new Cart({
    productId: req.body.productId,
    quantity: req.body.quantity,
    userId: req.body.userId,
  });

  try {
    const savedcart = await v.save();
    return res.send({
      message: "Order was created",
      order: {
        _id: cart._id,
        product: cart.product,
        quantity: cart.quantity,
      },
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.getcart = (req, res, next) => {
  Product.aggregate([
    {
      $lookup: {
        from: "carts",
        localField: "_id",
        foreignField: "product",
        as: "cart",
      },
    },

    {
      $project: {
        name: 1,
        Cart: { $size: "$cart" },
        product: { $slice: ["$cart", 2] },
      },
    },
  ])

    .exec()
    .then((orders) => {
      return res.status(200).json({
        count: orders.length,
        orders: orders,
      });
    })
    .catch((error) => {
      next(error);
    });
};
