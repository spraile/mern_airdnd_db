function isHost (req,res,next) {
	if(req.user.role !== "host") {
		return res.status(403).send({message: "Unauthorized request"})
	} else {
		next()
	}
}

module.exports = isHost;
