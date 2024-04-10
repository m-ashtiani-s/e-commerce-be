const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

async function userLoginController(req, res) {
	try {
		const { email, password } = req.body;
		if (!email) {
			return res.status(500).json({
				data: null,
				massage: "email is required",
				error: true,
				success: false,
			});
		}
		if (!password) {
			return res.status(500).json({
				data: null,
				massage: "password is required",
				error: true,
				success: false,
			});
		}
		
		userModel.findOne({ email }).then((user) => {
            console.log("user");
			if (!user) {
				return res.status(500).json({
					data: null,
					massage: "user not found",
					error: true,
					success: false,
				});
			}

			bcrypt.compare(password, user.password, function (err, isMatch) {
				if (err) {
					return res.status(500).json({
						data: null,
						massage: err,
						error: true,
						success: false,
					});
				}
				if (!isMatch) {
					return res.status(500).json({
						data: null,
						massage: "user information is false",
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

				return res.cookie('tokenn',token,tokenOption).status(201).json({
					data: {user,token},
					massage: "successfully login",
					error: false,
					success: true,
				});
			});
		});
	} catch (err) {
        console.log(err)
		res.json({
			data: null,
			massage: err,
			error: true,
			success: false,
		});
	}
}

module.exports = userLoginController;
