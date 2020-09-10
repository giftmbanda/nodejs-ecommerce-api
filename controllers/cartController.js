const Cart = require("../models/cartModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createOrder = async (req, res, next) => {
  const newCart = new Cart({
    product: req.body.productId,
    quantity: req.body.quantity,
    user: req.body.userId,
  });

  newCart.save((error, savedCart) => {
    if (error) return res.status(400).send({ message: "An error occured", error });
    return res.status(200).send({ message: "Order was created", Order: savedCart });
  });
};

exports.getOrder = (req, res, next) => {
  Cart.findById(req.params.cartId)
    .populate("product", "productImage name price")
    .exec( (err, cart) => {
      if (err) return res.status(400).send({ message: "showing order", err });
      const order = returnOrder(cart);
      return res.status(200).send({ message: "showing order", order });
    });
};

exports.getAllOrders = (req, res, next) => {
  Cart.find({ user: req.params.userId }, '-_id quantity product')
    .populate("product", "productImage name price createdAt -_id ")
    .exec((err, cart) => {
      if (err) return res.status(400).send({ message: "showing order", err });
      return res.status(200).send({ message:"showing all orders in the cart", cart,});
    });
};


function returnOrder(cart) {
  return {
    name: cart.product.name,
    price: cart.product.price,
    quantity: cart.quantity,
    total: (cart.product.price)*(cart.quantity),
    image: cart.product.productImage,
    orderDate: cart.createdAt,
  };
}