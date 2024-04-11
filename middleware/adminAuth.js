const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

async function adminAuthMiddleWare(req, res, next) {
	try {
		const user = req.user;
		if (user.role !== "ADMIN") {
			return res.status(403).json({
				data: null,
				message: 'dont have access',
				error: true,
				success: false,
			});
		}

        next()
	} catch (err) {
		res.json({
			data: null,
			message: err,
			error: true,
			success: false,
		});
	}
}

module.exports = adminAuthMiddleWare;
