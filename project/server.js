var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.set('view engine','jade');
app.set("views", path.join(__dirname + '/public/app', "views"));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect("mongodb://localhost:27017/employees",new function(err){
	if(err){
		console.log("Not connected to database", +err);
	}
	
	else{
		console.log("Connected");
	}
});

app.get('/view',function(req,res){
	var Add = require('./app/models/add');
	Add.find({},function(err,docs){
		if(err) { res.json(err); }
		else {			
			res.render('showAccomplishment',{users:docs});
		}
	});
});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
	console.log('Running the server on port', +port);
});
