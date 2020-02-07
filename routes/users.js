const router = require('express').Router();
const User = require('./../models/Users');

router.post('/',(req,res,next) => {
	User.create(req.body)
	.then( user => res.send(user))
	.catch(next)
})

router.put('/:id',(req,res,next) => {
	User.findByIdAndUpdate(req.params.id,req.body,{new:true})
	.then(user => res.json(user))
	.catch(next)
})
module.exports = router
