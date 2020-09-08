const Cart = require("../models/cartModel");
const Product = require("../models/prodModel");
//var Joi = require('@hapi/joi');
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


// router.post('/product/:product_id', passportConf.isAuthenticated, (req, res, next) => {
//     Cart.findOne({owner: req.user._id}, (err, cart) => {
//         cart.items.push({
//             item: req.body.product_id,
//             price: parseFloat(req.body.priceValue),
//             quantity: parseInt(req.body.quantity)
//         });

//         cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);

//         cart.save((err) => {
//             if (err) return next(err);
//             return res.redirect('/cart');
//         })

//     });

// });

// cartcontroller.cart=  function(req,res,next){
//     Cart.findOne({product: req.user._id})
//         .populate('items.item')
//         .exec((err, foundCart) => {
//             if (err) return next(err);

//             res.render('main/cart', {
//                 foundCart: foundCart,
//                 message: req.flash('remove')
//             });
//         });
// }

// router.post('/remove', passportConf.isAuthenticated, (req, res, next) => {
//     Cart.findOne({owner: req.user.productId}, (err, foundCart) => {
//         foundCart.items.pull(String(req.body.item));

//         foundCart.total = (foundCart.total - parseFloat(req.body.price)).toFixed(2);

//         foundCart.save((err, found) => {
//             if (err) return next(err);

//             req.flash('remove', 'Successfully removed the product');
//             res.redirect('/cart');
//         });
//     });
// });

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
  const ccart = new Cart({
    //  _id: mongoose.Types.ObjectId(),
    productId: req.body.productId,
    quantity: req.body.quantity,
    userId: req.user._id
  });

  try {
    const savedcart = await ccart.save();
    res.send({
      message: "Order was created",
      order: {
        _id: ccart._id,
        product: ccart.product,
        quantity: ccart.quantity,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getcart = (req, res, next) => {
  // if (req.body) {
  //     let total = 0;
  //     Cart.findOne({_id: req.body._id}, (err, cart) => {
  //         if (cart) {
  //             for (let i = 0; i < cart.length; i++) {
  //                 total += cart.items[i].quantity;
  //             }
  //             res.locals.cart = total;
  //         } else {
  //             res.locals.cart = 0;
  //         }
  //       //  next();
  //     });
  // } else {
  //     next();
  // }
  Product.aggregate([
      { $lookup: {
          from: "carts",
          localField: "_id",
          foreignField: "product",
          as: "cart",
        },
      },

      { $project: {
          name: 1,
          Cart: { $size: "$cart" },
          product: { $slice: ["$cart", 2] },
        },
      },
    ])

    // Cart
    //         .find()
    //         .select('_id product quantity')
    //         .populate('product', '_id name price')
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
//     return new Cart({
//      //  _id: mongoose.Types.ObjectId(),
//         product: req.body.productId,
//         quantity: req.body.quantity
//     });
// }
