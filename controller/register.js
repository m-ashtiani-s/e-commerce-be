const userModel = require("../models/userModels");

async function userRegisterController(req, res) {
	try {
		const { email, password, name,profilePic='' } = req.body;
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
		if (!name) {
			return res.status(500).json({
				data: null,
				massage: "name is required",
				error: true,
				success: false,
			});
		}
		userModel.findOne({ email }).then((user) => {
			if (!!user) {
				return res.status(500).json({
					data: null,
					massage: "email is existed",
					error: true,
					success: false,
				});
			}

			new userModel({
				email,
                role:'GENERAL',
				password,
				name,
                profilePic
			}).save();

			return res.status(201).json({
                data: {},
                massage: "user created",
                error: true,
                success: false,
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

module.exports = userRegisterController;
