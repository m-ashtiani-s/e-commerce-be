const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

async function userLoginController(req, res) {
	try {
		const { email, password } = req.body;
		if (!email) {
			return res.status(500).json({
				data: null,
				message: "email is required",
				error: true,
				success: false,
			});
		}
		if (!password) {
			return res.status(500).json({
				data: null,
				message: "password is required",
				error: true,
				success: false,
			});
		}
		
		userModel.findOne({ email }).then((user) => {
			if (!user) {
				return res.status(500).json({
					data: null,
					message: "user not found",
					error: true,
					success: false,
				});
			}

			bcrypt.compare(password, user.password, function (err, isMatch) {
				if (err) {
					return res.status(500).json({
						data: null,
						message: err,
						error: true,
						success: false,
					});
				}
				if (!isMatch) {
					return res.status(500).json({
						data: null,
						message: "user information is false",
						error: true,
						success: false,
					});
				}
                const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
                    expiresIn: "110h",
                });

                const tokenOption = {
                    httpOnly: true,
                    secure: true
                }

				return res.cookie('token',token,tokenOption).status(201).json({
					data: {user,token},
					message: "successfully login",
					error: false,
					success: true,
				});
			});
		});
	} catch (err) {
		res.json({
			data: null,
			message: err,
			error: true,
			success: false,
		});
	}
}

module.exports = userLoginController;
