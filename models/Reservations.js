const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
	code : {
        type : String,
		required : [true, "Reservation code is required"]
        		
	},
	startdate : {
		type : Date,
		required : [true, "Start date is required"]
	},
	enddate : {
		type : Date,
		required : [true, "End date is required"]
    },
    price : {
        type : Number,
		required : [true, "Reservation price is required"]
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