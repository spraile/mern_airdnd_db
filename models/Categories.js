const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
	name : {
		type: String,
		required : [true, "Category field required"]
	}
})

module.exports = mongoose.model('Category',CategorySchema);