const productm = require("../models/prodModel");
const categori = require("../models/cateModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.saveproduct = (req, res, next) => {

  const product = new productm({
    category: req.body.categoryId,
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
    quantity: req.body.quantity
  });

  //productm.init();

  product.save((err) => {

    if (err) {
      res.json({ error: "unable to create product",err });
    } else {
      res.json({
        message: "Product Created Successfully!",
        product: product
        //   _id: product._id,
        //   category: product.category,
        //   name: product.name,
        //   price: product.price,
        //   productImage: product.productImage,
        // },
      });
    }
    
  });
};

exports.getproducts = (req, res, next) => {
  // var pageNo = parseInt(req.query.pageNo)
  // var size = 5;
  // const query = {}
  // if(pageNo<0|| pageNo==0){
  //     res.json({"error" : true,"message" :"inavlid page number"})
  // }
  // query.skip= size*(pageNo-1)
  // query.limit =  size

  // .find()
  // .populate('category')
  // .exec((err, products) => {
  //     if (err) return next(err);

  //     res.render('main/category', {
  //         products: products
  //     });
  // });

  //         productm
  // .find()
  // .select('_id category name price productImage')
  // .populate('category', '_id name')
  // step through products 9 times
  //    const perPage = 9;
  //    //TODO: refactor below code further
  //    const page = req.params.page;

  //    productm
  //        .find()
  //        .skip(perPage * page)
  //        .limit(perPage)
  //        .populate('category')
  //        .exec((err, products) => {
  //            if (err) return next(err);
  //            productm.countDocuments().exec((err, count) => {
  //                if (err) return res.send(err);
  //                res.json({
  //                    products: products,
  //                    pages: count / perPage
  //                });
  //            });
  //        });
  categori
    .aggregate([
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
      {
        $skip: 0,
      },
      {
        $limit: 2,
      },
    ])
    .exec()
    .then((products) => {
      // const response = {
      //     count: products.length,
      //     products: products.map(product => {
      //         return {
      //             name: product.name,
      //             price: product.price,
      //             productImage: product.productImage
      //         }
      //     })
      // };

      res.status(200).json({
        count: products.length,
        products: products,
      });
    })
    .catch((error) => {
      res.send(error);
      // next(error);
    });
};

exports.getproduct = (req, res, next) => {
  var pageNo = parseInt(req.query.pageNo);

  var size = 5;
  const query = {};
  if (pageNo < 0 || pageNo == 0) {
    res.json({ error: true, message: "inavlid page number" });
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;

  productm
    .find({}, {}, query)
    .select("_id category name price productImage")
    .populate("category", "_id name")
    .exec()
    .then((products) => {
      const response = {
        count: products.length,
        products: products.map((product) => {
          return {
            name: product.name,
            price: product.price,
            productImage: product.productImage,
          };
        }),
      };
      res.status(200).json({
        count: products.length,
        products: products,
      });
    })
    .catch((error) => {
      res.send(error);
      // next(error);
    });
};
