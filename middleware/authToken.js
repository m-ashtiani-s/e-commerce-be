const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

async function authTokenMiddleWare(req, res,next) {
	try {
		jwt.verify(req.cookies?.token, process.env.SECRET_KEY, (err, decode) => {
			if (err) {
				return res.json({
					success: false,
					data: "Failed to authenticate token.",
				});
			}

			userModel
				.findById(decode.user_id)
				.then((user) => {
					if (user) {
						req.user = user;
						next();
					} else {
						return res.json({
							success: false,
							data: "User not found",
						});
					}
				})
				.catch((err) => {
					if (err) throw err;
				});
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

module.exports = authTokenMiddleWare;
