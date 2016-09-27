//var http = require("http");
var mongoose = require('mongoose');
var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://glittersloth:portfolio1319@ds041516.mlab.com:41516/forest');

var trees = mongoose.model('trees',{
	text : String
});
app.use( bodyParser.json() );       // to support JSON-encoded bodies

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
	console.log(req.body.forest);
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

// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

//get main.js controller
app.get('/main.js', function(req,res){
	res.sendfile('./main.js');
});

app.get('/tree1.png', function(req,res){
	res.sendfile('./tree1.png');
});

// application
app.get('/tallestTree', function(req,res){
	res.sendfile('./index.html');
});

app.listen(8080);
console.log('Server is listening to http://localhost/ on port 8080…');
