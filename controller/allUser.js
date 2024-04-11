const userModel = require("../models/userModels");

async function allUserController(req, res) {
	try {

        userModel.find().then((users)=>{
            res.json({
                data: users,
                message: '',
                error: false,
                success: true,
            })
        })
       
		
	} catch (err) {
        console.log(err)
		res.json({
			data: null,
			message: err,
			error: true,
			success: false,
		});
	}
}

module.exports = allUserController;
