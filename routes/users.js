const router = require('express').Router();
const User = require('./../models/Users');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken')
require('./../passport-setup');
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

router.post('/',(req,res,next) => {

	// get details from the forms
	
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let email = req.body.email;
	let password = req.body.password;
	let confirmPassword = req.body.confirmPassword;
	let number = req.body.number;

	//check the completeness of details from from
	if (!firstname || !lastname || !email || !password || !confirmPassword || !number) {
		return res.status(400).send({
			message : "Incomplete fields"
		})
	} 

	//check if password >= 8*
	if (password.length < 8 || confirmPassword.length < 8 ) {
		return res.status(400).send({
			message : "Password length is less than 8 characters"
		})
	}
	//check if passowrd == confirmpassword
	if (password !== confirmPassword) {
		return res.status(400).send({
			message : "passwords did not match"
		})
	}

	//check if email is taken
	User.findOne({email : req.body.email})
	.then(user => {
		if (user) {
			return res.status(400).send({
				message : "Email is already taken"
			})
		} else {
			const saltRounds = 10;
			bcrypt.genSalt(saltRounds,(err,salt)=>{
				bcrypt.hash(password,salt,(err,hash)=>{
					User.create({firstname,lastname,password : hash,email,number})
					.then( user => res.send(user))
					.catch(next)
				})
			})
			
		}
	})
})

router.post('/login',(req,res,next)=>{
	let email = req.body.email;
	let password = req.body.password;

	// check if there are credentials
	if (!email ||!password) {
		return res.status(400).send({
			message : "Something went wrong"
		})
	}
	// check if it is registered or match
	User.findOne({email : req.body.email})
	.then(user => {
		if (!user) {
			return res.status(400).send({
				message : "Something went wrong"
			})
		} else {
			// check if password matched with email holder
			bcrypt.compare(password, user.password, (err,passwordMatch)=>{
				if (passwordMatch) {
					let token = jwt.sign({id : user.id},'secret');
					return res.send({
						message : "Login successful",						
						token : token,
						user : {
							firstname : user.firstname,
							lastname : user.lastname,
							email : user.email,
							role : user.role,
							id : user._id
						}
					})
				} else {
					return res.send({
						message : "Something went wrong"
					})
				}
			})
		}
	})
	.catch(next)
})

router.put('/profile',passport.authenticate('jwt',{session : false}),upload.single('picture'),(req,res,next) => {
	req.body.picture = "/uploads/" + req.file.filename
	// res.json(req.body)
	User.findByIdAndUpdate(req.user.id,{$set : {profile : req.body}},{new:true})
	.then(user => res.json(user))
	.catch(next)
})
module.exports = router
