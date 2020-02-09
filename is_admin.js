function isAdmin (req,res,next) {
	if(req.user.role !== "admin") {
		return res.status(403).send({message: "unauthorized request"})
	} else {
		next()
	}
}


module.exports = isAdmin;
