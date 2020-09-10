const router = require("express").Router();
const cartControler = require("../controllers/cartController");
const { verifyUser, verifyAdmin } = require("../verifyToken");

router.post("/", cartControler.createOrder);

router.get("/:cartId", cartControler.getOrder);

router.get("/show/:userId", cartControler.getAllOrders);
// router.get("/cart", verifyUser, cartControler.cart);

module.exports = router;
