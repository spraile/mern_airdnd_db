const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
	name : {
		type : String,
		required : [true, "Place name is required"]
	},
	minrec : {
		type : Number,
		required : [true, "Minimum recommended pax is required"]
	},
	maxrec : {
		type : Number,
		required : [true, "Maximum recommended pax is required"]
	},
	categoryId : {
		type : String,
		required : [true, "CategoryId is required"]
	},
	baseprice : {
		type: Number,
		required : [true, "Base price is required"]
	},
	description : {
		type : String,
		required : [true, "Place description is required"]
	},
	location : {
		type : String,
		required : [true, "Place description is required"]
	},
	images : [{
		image : String
	}],
	reviews : [{
		userId : String,
		message : String,
		dateCreated : Date
	}]

})

module.exports = mongoose.model('Place',PlaceSchema)