const router = require("express").Router();
const adminControler = require("../controllers/adminController");
//const { verifyUser, verifyAdmin } = require("../verifyToken");

router.post("/register", adminControler.signUp)

router.post("/login", adminControler.logIn)

router.patch('/:userId', adminControler.updateAdmn);

router.delete('/:userId', adminControler.deleteAdmin);

router.get("/data", adminControler.data)

module.exports = router;
