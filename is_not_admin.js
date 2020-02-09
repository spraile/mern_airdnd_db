function isNotAdmin (req,res,next) {
	if(req.user.role === "admin") {
		return res.status(403).send({message: "Unauthorized request"})
	} else {
		next()
	}
}


module.exports = isNotAdmin;
