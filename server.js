var http = require("http");
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body_parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://glittersloth:portfolio1319@ds041516.mlab.com:41516/forest');

var trees = mongoose.model('trees',{
	text : String
});

//get all existing trees
app.get('/api/trees', function(req,res){

	trees.find(function(err, trees){
		if(err){
			res.send(err);
		}

		res.json(trees);
	});
});

//create a tree and send all trees
app.post('/api/trees', function(req,res){
	trees.create({
		text : req.body.text,
		done : false
	}, function(err,todo){
		if(err){
			res.send(err);
		}
		
		trees.find(function(err,trees){
			if(err)
				res.send(err)
			res.json(trees);
		});
	});
});

//delete a tree
app.delete('/api/trees/:trees_id', function(req,res){
	trees.remove({
		_id : req.params.todo_id
	}, function(err,trees){
		if(err)
			res.send(err);

		trees.find(function(err,todos){
			if(err)
				res.send(err)
			res.json(trees);
		});
	});
});

// application
ap.get('*', fuction(req,res){
	res.sendfile('./home/apierce/319/Portfolio1/index.html');
});

http.createServer(function(request, response) {  
  response.writeHead(200, {"Content-Type": "text/plain"});  
  response.write("Hello from the Node.js server!");  
  response.end();
}).listen(8080);
console.log('Server is listening to http://localhost/ on port 8080…');
