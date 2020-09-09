const router = require("express").Router();
const adminControler = require("../controllers/adminController");
const userControler = require("../controllers/userControlller");
const { verifyUser, verifyAdmin } = require("../verifyToken");

router.post("/", adminControler.signUp)

router.post("/login", adminControler.logIn)

router.patch('/:userId', adminControler.updateAdmn);

router.delete('/:userId', adminControler.deleteAdmin); //delete admin

router.delete('/user/:userId', userControler.deleteUser); //delete user

router.get("/data", verifyAdmin, adminControler.data)

module.exports = router;
