function isUser (req,res,next) {
	if(req.user.role !== "user") {
		return res.status(403).send({message: "Unauthorized request"})
	} else {
		next()
	}
}


module.exports = isUser;
