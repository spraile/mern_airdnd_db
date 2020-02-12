const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
	code : {
        type : String,
		required : [true, "Reservation code is required"]       		
	},
	reservedDates : [{
		reservedDate : Date
	}],
    price : {
        type : Number,
		required : [true, "Reservation price is required"]
	},
	guestCount : {
		type : Number,
		required : [true, "Guest count is required"]
	},
	status : {
		type : String,
		default : "Pending"
	},
	placeId : {
		type : String,
		required : [true, "Place ID is required"]
	},
	hostId : {
		type: String,
		required : [true, "Host ID is required"]
	},
	userId : {
		type : String,
		required : [true, "Customer ID is required"]
	}

})

module.exports = mongoose.model('Reservation',ReservationSchema)