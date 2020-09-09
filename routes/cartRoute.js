const router = require("express").Router();
const cartControler = require("../controllers/cartController");
const { verifyUser, verifyAdmin } = require("../verifyToken");

router.post("/", verifyUser, cartControler.savecart);

router.get("/show", verifyUser, cartControler.getcart);

// router.get("/cart", verifyUser, cartControler.cart);

module.exports = router;
