const express = require("express");
const userRegisterController = require("../controller/register");
const userLoginController = require("../controller/login");
const authTokenMiddleWare = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");
const router = express.Router()


router.post('/register',userRegisterController)
router.post('/login',userLoginController)
router.get('/user-details',authTokenMiddleWare,userDetailsController)

module.exports = router
