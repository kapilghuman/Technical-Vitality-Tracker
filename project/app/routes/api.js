var User = require('../models/user');


module.exports = function(router){
	//USER REGISTRATION ROUTE
	 //http://localhost:port/api/users
	
	router.post('/users', function(req, res){
	var user = new User();
	user.username = req.body.username;
	user.userId = req.body.userId;
	user.password = req.body.password;
	user.role = req.body.role;
	if(req.body.username == null || req.body.username == '' || req.body.userId == null || req.body.userId == '' || req.body.password == null || req.body.password == '' || req.body.role == null){
		res.json({ success:false , message:'Ensure Username, UserId and Password were provided' });
	} 
	
	else{
		user.save(function(err){
		 if(err){
			res.json({ success:false , message:'Username or UserId already Exits' });
		 }
		 else{
			res.json({ success:true , message:'User Created!!' });
		 }
	 });
	}
  });
  
  //USER LOGIN ROUTE
  //http://localhost:port/api/authenticate
  
  router.post('/authenticate', function(req, res){
	 User.findOne({ userId: req.body.userId }).select('userId username password role').exec(function(err, user){
		if(err) throw err; 
		
		if(!user){
			res.json({ success:false, message:"Could not Authenticate the user"});
		}
			
		else if(user){
			
			if(req.body.password){
			var validPassword = user.comparePassword(req.body.password);
			}
			
			else{
				  res.json({ success:false, message:"No password provided"});
			}
			
			if(!validPassword){
			    res.json({ success:false, message:"Could Authenticate the password"});
		    }
			
			else{
				res.json({ success:true, message:"Authenticate User"});
			}
		}
	 });
  });
  
  
  return router;
}
