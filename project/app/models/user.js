var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	username: { type:String, required:true, lowercase:true, unique:true },
	userId: { type:String, required:true, lowercase:true, unique:true },
	password: { type:String, required:true },
	role: { type:String, required:true }
});


//encrypting password
UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);
		user.password = hash;
		
		 next();
	});
});


UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

//comparing role
UserSchema.methods.compareRole = function(role){
    if(role == this.role){ return true; }
	
    else{ return false; }
}
module.exports = mongoose.model('User', UserSchema);
