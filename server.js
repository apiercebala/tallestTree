//var http = require("http");
var mongoose = require('mongoose');
var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

mongoose.connect('mongodb://glittersloth:portfolio1319@ds041516.mlab.com:41516/forest');

var trees = mongoose.model('trees',{
	text : String
});


app.use( bodyParser.json() );       // to support JSON-encoded bodies

//get css styles
app.get('/interface.css', function(req,res){
	res.sendfile('./interface.css');
});

// application
app.get('/tallestTree', function(req,res){
	res.sendfile('./index.html');
});

//get main.js controller
app.get('/main.js', function(req,res){
	res.sendfile('./main.js');
});


app.get('/tree1.png', function(req,res){
	res.sendfile('./tree1.png');
});


var PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log("Server is listening to http://localhost/ on port "+PORT);

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
		text : req.body.forest,
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

