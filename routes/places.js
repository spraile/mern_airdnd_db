const router = require('express').Router();
const isHost = require('./../is_host');
const isNotAdmin = require('./../is_not_admin');
const passport = require('passport');
const multer = require('multer');
const storage = multer.diskStorage({
	destination : (req,file,cb) =>{
		cb(null,'./public/places')
	},
	filename : (req,file,cb)=>{
		cb(null, file.originalname)
	}
})

const upload = multer({storage : storage})

const Place = require('./../models/Places')

// index
router.get('/', function (req,res,next) {
	Place.find()
	.then( places => res.json(places))
	.catch(next)
});

//single
router.get('/:id',function (req,res,next) {
	Place.findOne({ _id : req.params.id })
	.then ( places=>res.json(places))
	.catch(next)
})


//create
router.post('/',passport.authenticate('jwt',{session : false}),isHost,upload.array('images'),(req,res,next) => {
	let imgs = req.files.map(file => {
		file.filename = "/uploads/" + file.filename
		return file.filename
	})
	console.log(imgs)

		
		let newFile = imgs.map((img) => {

			newfile = {
				image : img
			}
			return newfile
		})
		
	let allImages = newFile
	req.body.hostId = req.user._id	
	req.body.hostName = req.user.firstname + " " + req.user.lastname
	req.body.images = allImages;
	Place.create(req.body)
	.then(places => res.send(places))
	.catch(next)
})

router.put('/:id',passport.authenticate('jwt',{session : false}),isHost, (req,res,next) => {

	Place.findByIdAndUpdate(req.params.id, req.body,{new:true})
	.then(places=>res.json(places))
	.catch(next)

})

// add image
router.put('/:id/add-image',passport.authenticate('jwt',{session : false}),isHost,upload.single('image'), (req,res,next) => {

	imageAdded = "/uploads/" + req.file.filename
	// res.json(imageAdded)
	// Place.find({ _id : req.params.id}).then(places=>res.json(places))
	Place.findOneAndUpdate({ _id : req.params.id},
		{$push: {images: {image : imageAdded}}},
		{new:true})
	.then(places=>res.json(places))
	.catch(next)

})
// add review
router.put('/:pid/review',passport.authenticate('jwt',{session : false}),isNotAdmin,(req,res,next) => {
	// res.json(req.body)
	Place.findOneAndUpdate({ _id : req.params.pid},
			{$push: {reviews: req.body}},
			{new:true})
	.then(place => res.json(place))
	.catch(next)
	console.log(req.files)
	console.log(req.body)
})

// add date
router.put('/:pid/reservation',passport.authenticate('jwt',{session : false}),isHost,(req,res,next) => {
	// res.json(req.body)
	Place.findOneAndUpdate({ _id : req.params.pid},
			{$push: {reservedDates: req.body}},
			{new:true})
	.then(place => res.json(place))
	.catch(next)
	console.log(req.files)
	console.log(req.body)
})

// delete image
router.put('/:pid/:iid',passport.authenticate('jwt',{session : false}),isHost,(req,res,next) => {

	Place.findOneAndUpdate({ _id : req.params.pid},
			{$pull: {images: {_id : req.params.iid}}},
			{new:true})
	.then(place => res.json(place))
	.catch(next)
	console.log(req.files)
	console.log(req.body)
})



// //add review
// router.put('/:id',(req,res,next) => {
// 	// Place.findOne({ _id : req.params.id })
// 	// Place.findOneAndUpdate({ _id : req.params.id},
// 	// 	{$push: {reviews: req.body}},
// 	// 	{new:true})
// 	// .then(places=>res.json(places))
// 	// .catch(next)
// 	res.json(req.params.pid)

// })


//delete place
router.delete('/:id',passport.authenticate('jwt',{session : false}),isHost,(req,res,next) => {
	Place.findOneAndDelete({ _id : req.params.id })
	.then (places=>res.json(places))
	.catch(next)
})
module.exports = router;