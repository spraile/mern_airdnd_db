const router = require('express').Router();
const Request = require('./../models/Requests');
const User = require('./../models/Users');
const isAdmin = require('./../is_admin');
const isUser = require('./../is_user');
const passport = require('passport');

router.get('/',passport.authenticate('jwt',{session : false}),isAdmin, function (req,res,next) {

	Request.find()
	.then( requests => {
		res.json(requests)
	})
	.catch(next)

});

//single
router.get('/:id',passport.authenticate('jwt',{session : false}),isAdmin,function (req,res,next) {
	Request.findOne({ _id : req.params.id })
	.then(request =>res.json(request))
	.catch(next)
})

//create
router.post('/',passport.authenticate('jwt',{session : false}),isUser,(req,res,next) => {

        let dateCr = new Date()

        req.body.userId = req.user.id;
        req.body.dateCreated = dateCr.toISOString().slice(0,10);
        req.body.code = "RE" + Math.random()
		Request.create(req.body)
		.then((request)=>{
			res.send(request)
		})
		.catch(next)
})

//update
router.put('/:id',passport.authenticate('jwt',{session : false}),isAdmin,(req,res,next) => {

    switch(req.body.decision) {
        case "accepted":
            req.body.status = "Accepted"
            req.body.role = "host"

            Request.findByIdAndUpdate(req.params.id,req.body,{new:true})
            .then(request => {
            	User.findByIdAndUpdate(request.userId,req.body,{new:true})
            	.then(request => res.json(request))
            	.catch(next)
            })
            .catch(next)
            break;
        case "rejected":
            req.body.status = "Rejected"
            Request.findByIdAndUpdate(req.params.id,req.body,{new:true})
            .then(request => res.json(request))
            .catch(next)

            break;
        default:
            res.status(400).send({"message" : "decision not found"})            
    }
	
})

module.exports = router;