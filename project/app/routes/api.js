var User = require('../models/user');
var Add = require('../models/add');
var jwt = require('jsonwebtoken');
var secret = "harrypotter";

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
	 User.findOne({ username: req.body.username }).select('username userId password role').exec(function(err, user){
		if(err) throw err; 
		
		if(!user){
			res.json({ success:false, message:"Could not Authenticate the user"});
		}
			
		else if(user)
		{
               		if(req.body.password){
                		var validPassword = user.comparePassword(req.body.password);
               		}
               		else{
                   		res.json({success:false , message:"Please enter password"});
               		}
               		if(req.body.role){
                		var validRole= user.compareRole(req.body.role);
               		}
               		else{
                		res.json({success:false , message:"Please enter valid role"});   
               		}
            		if(!validPassword){
                		res.json({success:false,message:'Could not authenticate password'});
            		}
            		else if(!validRole){
                		res.json({success:false,message:'Could not authenticate role'});   
            		}
            		else{

						this.temp_role=req.body.role;
						this.temp_username=req.body.username;
            			var token=jwt.sign({username:user.username, userId:user.userId, role:user.role },secret, { expiresIn : '24h' } );
                		res.json({success:true,message:"User authenticated ",token:token});
            		}
		}
	 });
  });
    router.use(function(req,res,next){
        var token=req.body.token || req.body.query || req.headers['x-access-token'];
        if(token){
            //verify token
            jwt.verify(token, secret, function(err,decoded){
                if(err){
                    res.json({success:false,message:"Token invalid"});
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else{
            res.json({success:false,message:"No token provided"});
        }
    });
    //localhost:3000/api/me
    router.post('/me',function(req,res){
        res.send(req.decoded);
    });  

	//localhost:3000/api/adds
	router.post('/adds', function(req, res){
		var add = new Add();

		add.username = req.decoded.username;
		add.role = req.decoded.role;
		
		add.title = req.body.title;
		add.type = req.body.type;		
		add.status = req.body.status;
		add.date = req.body.date;
		add.url = req.body.url;
		add.description = req.body.description;

		if(add.type == 'Badges' || add.type == 'Blog' ){
			add.points = 1;
		}

		else if(add.type == 'Idea' || add.type == 'Patent' ){
				add.points = 2;
		}
			
		else{
			add.points = 3;
		}

		if(req.body.title == '' || req.body.title == null || req.body.type == null || req.body.date == null || req.body.date == '' || req.body.date == null || req.body.description == null){
			 res.json({ success:false , message:'Please provide all fields.' });
		} 
		
		else{
			//console.log("Current logged in username is =>",req.decoded.username);
			add.save(function(err){
				//console.log("Title is "+req.body.title);
			 if(err){
				res.json({ success:false , message:'Title already exists !!' });
			 }
			 else{
				res.json({ success:true , message:'ACCOMPLISHMENT has been added!!' });
			 }
			});
		}
		
		});
	
	router.get('/accomplishment', function(req, res) {

		if(req.decoded.role =='Normal_user'){

			Add.find({ username : req.decoded.username}).select().sort({date : -1}).exec(function(err,accomplishments) {
				if(err) {res.json({success:false , errorMsg: err})}
				else{	
					res.json({ success: true, accomplishments: accomplishments });
				}
			})

		}

		else if(req.decoded.role =='SPOC/Manager'){
			Add.find({ $or:[ {'username': req.decoded.username }, {'role': 'Normal_user'} ]}).select().sort({role:-1,username : 1,date:-1}).exec(function(err,accomplishments) {
				if(err) throw err;
				else{
					
					res.json({ success: true, accomplishments: accomplishments });
				}
			})
		}

		else{
			Add.find({}).select().sort({role:-1,username : 1,date : -1}).exec(function(err,accomplishments) {
				if(err) throw err;
				else{
					res.json({ success: true, accomplishments: accomplishments });
				}
			})
		}
    });
	  
	router.get('/edit/:id', function(req, res){
		var editStatus = req.params.id;
		    Add.findOne({ username: req.decoded.username }, function(err, user){
				if(err) throw err;
				if(!user){
					res.json({ success: false, message: "No user Found"});
				}
				
				else{
				  Add.findOne({_id: editStatus}, function(err, users){
					if(err) throw err;
					if(!users){
						res.json({ success: false, message: "No user Found"});
					}
					
					else{
						res.json({ success: true, users: users});
					}
				  });
				}
			});
	});
	
	router.put('/edit', function(req, res){
		var editStatus = req.body._id;
		    if(req.body.status) var newStatus = req.body.status;
			
		    Add.findOne({ username: req.decoded.username }, function(err, user){
				if(err) throw err;
				if(!user){
					res.json({ success: false, message: "No user Found"});
				}
				
				else{
					if(newStatus){
						Add.findOne({ _id: editStatus }, function(err, users){
					     if(err) throw err;
					     if(!users){
						 res.json({ success: false, message: "No user Found"});
					     }
					
					     else{
						   users.status = newStatus;
							 users.save(function(err){
								 if(err){
									 throw err;
								 }
								 else{
									 res.json({ success: true, message: "Status is Updated"}); 
								 }
							 });
					        }
				        });
				    }
			    }
			});
	});
	  
	router.delete('/accomplishment/:title',function(req,res) {
        var deletedTitle = req.params.title;
            Add.findOneAndRemove({ title: deletedTitle}, function(err,user) {
                if(err) throw err;
                res.json({ success: true });
            });
    });
	
  
	router.post('/performer', function(req, res) {

		console.log('you are in get method')
		console.log("from dates value "+req.body.from)
		console.log("to dates value "+req.body.to)
		console.log('you are in get method')
		if(req.decoded.role =='SPOC/Manager'){
			Add.aggregate([
				{$match:{	 $and: [ 
					{date:{$gt : new Date(req.body.from) ,$lt : new Date(req.body.to)}},  
					{ $or:[ {username : req.decoded.username }, {role: 'Normal_user'} ]}
				]
				}},
				{$group : {
				_id : { username: "$username", role: "$role" },
				total : {$sum : '$points'},
				total_accomplishment : {$sum : 1}
			}}
			 ,{"$sort": { "total": -1 ,"_id.role":-1 } }
			 // Optionally limit results
			,{ "$limit": 1 }
		],function(err,accomplishments) {
				if(err) {res.json({success:false , errorMsg: err})}
				else{	
					console.log(accomplishments);
					res.json({ success: true, accomplishments: accomplishments });
				}
			});
		}

		else{
			Add.aggregate([
				{$match:{date:{$gt : new Date(req.body.from) ,$lt : new Date(req.body.to)}}},
				{$group : {
				_id : { username: "$username", role: "$role" },
				total : {$sum : '$points'},
				total_accomplishment : {$sum : 1}
			}}
			 ,{"$sort": { "total": -1 ,"_id.role":-1} }
			 // Optionally limit results
			,{ "$limit": 1 }
		],function(err,accomplishments) {
				if(err) {res.json({success:false , errorMsg: err})}
				else{	
					console.log(accomplishments);
					res.json({ success: true, accomplishments: accomplishments });
				}
			});
		}
		

		});

  return router;
}
