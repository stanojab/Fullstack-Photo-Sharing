var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'description' : String,
	'path' : String,
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'postedAt' : {
		type: Date,
		default: Date.now
	},
	'views' : Number,
	'likes' : Number,
	'dislikes' : Number,
	'reports' : Number,
	'comments' : [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}]
});

module.exports = mongoose.model('photo', photoSchema);
