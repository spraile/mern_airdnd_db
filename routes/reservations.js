const router = require('express').Router();
const Reservation = require('./../models/Reservations');
const isHost = require('./../is_host');
const isAdmin = require('./../is_admin');


router.get('/', function (req,res,next) {

	Reservation.find()
	.then( categories => {
		res.json(categories)
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
router.post('/',(req,res,next) => {

        req.body.code = "R"+Math.random()

		Reservation.create(req.body)
		.then((reservation)=>{
			res.send(reservation)
		})
		.catch(next)
})


//update, status only
router.put('/:id',(req,res,next) => {

	Reservation.findByIdAndUpdate(req.params.id,req.body,{new:true})
	.then(reservation => res.json(reservation))
	.catch(next)

})

router.delete('/:id',(req,res,next) => {
	Reservation.findOneAndDelete(
	{
		_id : req.params.id
	})
	.then(reservation => res.json(reservation))
	.catch(next)
})

module.exports = router