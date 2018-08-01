var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddSchema = new Schema({
	username :{type:String , required:true},
	role : {type:String , required:true},
	title: { type:String, required:true, unique:true },
	type: { type:String, required:true},
	status: { type:String },
	date: { type:Date, required:true },
	url: { type:String, required:true },
	description: { type:String, required:true},
	points: { type:Number }
});

module.exports = mongoose.model('Add', AddSchema);
