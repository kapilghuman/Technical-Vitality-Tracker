var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var couchdb = require('node-couchdb');
var bodyParser = require('body-parser');
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(__dirname + '/public'));

var couch = new couchdb({
	auth: {
		user: 'admin',
		password: 'admin'
	}
});

couch.listDatabases().then(function(dbs){
	console.log(dbs);
});

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
	console.log('Running the server on port', +port);
});
