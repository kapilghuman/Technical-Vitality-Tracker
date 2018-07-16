var Add = require('../models/add');

module.exports = function(route){
	//ADD ACCOMPLISHMENTS ROUTE
	 //http://localhost:port/api_1/adds
	
	route.post('/adds', function(req, res){
	var add = new Add();
	add.title = req.body.title;
	add.type = req.body.type;
	add.date = req.body.date;
	add.url = req.body.url;
	add.description = req.body.description;
	if(req.body.title == '' || req.body.title == null || req.body.type == null || req.body.date == null || req.body.date == '' || req.body.date == null || req.body.description == null){
	     res.json({ success:false , message:'Please provide all fields.' });
	} 
	
	else{
		add.save(function(err){
		 if(err){
			res.json({ success:false , message:'Title Already Exits' });
		 }
		 else{
			res.json({ success:true , message:'ACCOMPLISHMENT has been added!!' });
		 }
	    });
	}
	
	});
	 
	return route;
}
