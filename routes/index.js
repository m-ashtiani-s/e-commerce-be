const express = require("express");
const userRegisterController = require("../controller/register");
const userLoginController = require("../controller/login");
const router = express.Router()


router.post('/register',userRegisterController)
router.post('/login',userLoginController)

module.exports = router
