const router = require('express').Router();
const User = require('./../models/User');

router.post('/',(req,res,next) => {
	User.create(req.body)
	.then( user => res.send(user))
	.catch(next)
})

module.exports = router
