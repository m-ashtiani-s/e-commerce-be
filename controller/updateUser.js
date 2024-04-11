const userModel = require("../models/userModels");

async function updateUserController(req, res) {
	try {
		const { userId, email, name, role } = req.body;

		const payload = {
			...(email && { email: email }),
			...(name && { name: name }),
			...(role && { role: role })
		};

        userModel.findByIdAndUpdate(userId,payload).then((user)=>{
             return res.json({
                data: null,
                message: 'updated',
                error: false,
                success: true,
            });
        })
	} catch (err) {
		res.json({
			data: null,
			message: err,
			error: true,
			success: false,
		});
	}
}

module.exports = updateUserController;
