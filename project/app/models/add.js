var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddSchema = new Schema({
	username :{type:String , required:true},
	role : {type:String , required:true},
	title: { type:String, required:true, lowercase:true, unique:true },
	type: { type:String, required:true, lowercase:true},
	patent: { type:String },
	idea: { type:String },
	date: { type:Date, required:true },
	url: { type:String, required:true },
	description: { type:String, required:true}
});

module.exports = mongoose.model('Add', AddSchema);
