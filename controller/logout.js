const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

async function userLogoutController(req, res) {
	try {
		res.clearCookie('token')
        res.json({
			data: null,
			massage: 'logout succesfully',
			error: false,
			success: true,
		});
	} catch (err) {
		res.json({
			data: null,
			massage: err,
			error: true,
			success: false,
		});
	}
}

module.exports = userLogoutController;
