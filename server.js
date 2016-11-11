//var http = require("http");
var mongoose = require('mongoose');
var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://glittersloth2:portfolio2319@ds149577.mlab.com:49577/portfolio2');


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

var userSchema = new Schema({
	username: String,
	password: String,
	trees: [{id: Number}]
});

var user = mongoose.model('User',userSchema);

//return user if user matches req user
app.get('/api/users', function(req,res){
	var myUsername = req.body.username;
	var pass = req.body.password;
	user.find({username: myUsername, password: pass},function(err, user){
		if(err){
			res.json({"error":err});
		}
		res.json({"username": myUsername, "password": pass});
	});
});

//post user data to database
app.post('/api/users', function(req,res){
	var myUsername = req.body.name;
	var pass = req.body.password;
	user.create({
		username: myUsername,
		password: pass,
	}, function(err,todo){
		if(err){
			res.json({"error":err});
		}
		res.json({"data": myUsername});
	});
});

//create a tree and send all trng-hide="showlogin"ees
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

