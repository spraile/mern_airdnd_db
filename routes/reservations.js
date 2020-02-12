const router = require('express').Router();
const Reservation = require('./../models/Reservations');
const User = require('./../models/Users');
const isHost = require('./../is_host');
const isUser = require('./../is_user');
const passport = require('passport');
const stripe = require('stripe')("sk_test_QIdH84htWzpuOq95FvEV1A5j0061iS9SJH")

// const isAdmin = require('./../is_admin');


router.get('/',passport.authenticate('jwt',{session : false}), function (req,res,next) {

	if(req.user.role == 'host') {
		Reservation.find({ hostId : req.user.id })
		.then( reservation => {
			res.json(reservation)
		})
		.catch(next)
	} else {
		Reservation.find( {userId : req.user.id })
		.then( reservation => {
			res.json(reservation)
		})
		.catch(next)
	}
	

});

//single
router.get('/:id',function (req,res,next) {
	Reservation.findOne({ _id : req.params.id })
	.then(reservation =>res.json(reservation))
	.catch(next)
})

//create
router.post('/',passport.authenticate('jwt',{session : false}),isUser,(req,res,next) => {

        req.body.code = "RV"+Math.random().toString(36).substring(2, 15)
        req.body.code = req.body.code.toUpperCase()
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

router.post('/stripe',passport.authenticate('jwt',{session : false}),isHost,(req,res,next) => {

	let total = req.body.price;
	
	User.findOne({_id : req.body.userId})
	.then( user => {
		if(!user) {
			res.status(500).send({message: 'Incomplete'})
		} else {
			if(!user.stripeCustomerId){
	            stripe.customers
	            .create({
	                email: req.user.email,
	            })
	            .then(customer => {
	                return User.findByIdAndUpdate({ _id: user._id},{stripeCustomerId : customer.id}, {new:true})
	            })
	            .then( user => {
	                return stripe.customers.retrieve(user.stripeCustomerId)
	            })
	            .then((customer) => {
	                return stripe.customers.createSource(customer.id, {
	                source: 'tok_visa',
	                });
	            })
	            .then((source) => {
	                return stripe.charges.create({
	                amount: total,
	                currency: 'usd',
	                customer: source.customer,
	                });
	            })
	            .then((charge) => {
	                // New charge created on a new customer
	                console.log(charge)

	                res.send(charge);
	            })
	            .catch((err) => {
	                // Deal with an error
	                res.send(err)
	            });
	        } else {
                stripe.customers.retrieve(user.stripeCustomerId)
                .then((customer) => {
                    return stripe.customers.createSource(customer.id, {
                    source: 'tok_visa',
                    });
                })
                .then((source) => {
                    return stripe.charges.create({
                    amount: total * 100, //multiply by 100 for centavos
                    currency: 'usd',
                    customer: source.customer,
                    });
                })
                .then((charge) => {
                    // New charge created on a new customer
                    // console.log(charge)
                    res.send(charge);
                })
                .catch((err) => {
                    // Deal with an error
                    res.send(err)
                });
            }


		}
	})

})

//update, status only
router.put('/:id',passport.authenticate('jwt',{session : false}),isHost,(req,res,next) => {

	Reservation.findByIdAndUpdate(req.params.id,req.body,{new:true})
	.then(reservation => res.json(reservation))
	.catch(next)

})


module.exports = router