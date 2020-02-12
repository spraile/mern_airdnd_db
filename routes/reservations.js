const router = require('express').Router();
const Reservation = require('./../models/Reservations');
const isHost = require('./../is_host');
const isUser = require('./../is_user');
const passport = require('passport');

// const isAdmin = require('./../is_admin');


router.get('/',passport.authenticate('jwt',{session : false}), function (req,res,next) {

	Reservation.find()
	.then( reservation => {
		res.json(reservation)
	})
	.catch(next)

});

//single
router.get('/:id',function (req,res,next) {
	Reservation.findOne({ _id : req.params.id })
	.then(reservation =>res.json(reservation))
	.catch(next)
})

//create
router.post('/',passport.authenticate('jwt',{session : false}),isUser,(req,res,next) => {

        req.body.code = "R"+Math.random()
		let reserved = req.body.reservedDates
		// res.send = reserved
		console.log(reserved)
		let newReserved = reserved.map(rdate => {
			return ({ reservedDate : rdate})
		})
		console.log(newReserved)
		req.body.reservedDates = newReserved
		Reservation.create(req.body)
		.then((reservation)=>{
			res.send(reservation)
		})
		.catch(next)
})


//update, status only
router.put('/:id',passport.authenticate('jwt',{session : false}),isHost,(req,res,next) => {

	Reservation.findByIdAndUpdate(req.params.id,req.body,{new:true})
	.then(reservation => res.json(reservation))
	.catch(next)

})


module.exports = router