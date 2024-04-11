

async function userDetailsController(req, res) {
	try {
        const user1=req.user
        res.json({
			data: user1,
			message: '',
			error: false,
			success: true,
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

module.exports = userDetailsController;
