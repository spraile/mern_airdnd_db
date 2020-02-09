const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
	code : {
        type : String,
		required : [true, "Request code is required"]       		
	},
	dateCreated : {
		type : Date,
		required : [true, "Request date is required"]
	},
	userId : {
		type : String,
		required : [true, "UserID is required"]
    },
    status : {
        type : String,
        default : "Pending"
    }

})

module.exports = mongoose.model('Request',RequestSchema)