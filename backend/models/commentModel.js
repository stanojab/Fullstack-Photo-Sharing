var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var commentSchema = new Schema({
	'text' : String,
	'commentedOn' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'photo'
	},
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'postedAt' : {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('comment', commentSchema);
