const router = require('express').Router();
const Category = require('./../models/Categories');

router.get('/', function (req,res,next) {

	Category.find()
	.then( categories => {
		res.json(categories)
	})
	.catch(next)

});

//single
router.get('/:id',function (req,res,next) {
	Category.findOne({ _id : req.params.id })
	.then(category =>res.json(category))
	.catch(next)
})

//create
router.post('/',(req,res,next) => {


		Category.create(req.body)
		.then((category)=>{
			res.send(category)
		})
		.catch(next)
})


//update
router.put('/:id',(req,res,next) => {

	Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
	.then(category => res.json(category))
	.catch(next)

})

router.delete('/:id',(req,res,next) => {
	Category.findOneAndDelete(
	{
		_id : req.params.id
	})
	.then(category => res.json(category))
	.catch(next)
})
module.exports = router;