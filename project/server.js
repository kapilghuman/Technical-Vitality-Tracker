var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var route = express.Router();
var appRoutes = require('./app/routes/api')(router);
var appRoute = require('./app/routes/api_1')(route);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);
app.use('/api_1', appRoute);

mongoose.connect("mongodb://localhost:27017/employees",new function(err){
	if(err){
		console.log("Not connected to database", +err);
	}
	
	else{
		console.log("Connected");
	}
});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
	console.log('Running the server on port', +port);
});
