const router = require('express').Router();
const cateControler = require('../controllers/cateController')
//const { verifyUser, verifyAdmin } = require("../verifyToken"); //new import

router.post('/savecat', cateControler.saveCategory);

router.get('/getcat', cateControler.getcat);

module.exports = router;