const express = require("express");
const userRegisterController = require("../controller/register");
const userLoginController = require("../controller/login");
const authTokenMiddleWare = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");
const userLogoutController = require("../controller/logout");
const router = express.Router()


router.post('/register',userRegisterController)
router.post('/login',userLoginController)
router.get('/user-details',authTokenMiddleWare,userDetailsController)
router.get('/userLogout',authTokenMiddleWare,userLogoutController)

module.exports = router
