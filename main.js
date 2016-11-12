var app = angular.module('myGame',[]);
	app.service('sharedVars',function(){
		var postedUser = false;
		var validUser = false;
		return {
			postedUser: false,
			validUser: false,
			currentUser: {
				username: "user",
				password: "password",
				trees: []
			}
		}
	});
	app.controller('mySignUp',['$scope','$http','sharedVars',function($scope,$http,sharedVars){

		$scope.postedUser = sharedVars.postedUser;
		$scope.validUser = sharedVars.validUser;
		console.log($scope.validUser);
		$scope.signup = function(user){
			var myData = "";
			$http.post('/api/users',JSON.stringify(user)).success(function(data,status){
				myData = data;
				console.log(myData);
				console.log("Post success!");
				$scope.postedUser = true;
			});
		};

		$scope.goToLogin = function(){
			$scope.postedUser = true;
			sharedVars.postedUser = $scope.postedUser;
		};

		$scope.signin = function(user){
			var myLoginData = "";
			var config = {
				params: {
					password: user.Lpassword
				}
			}
			//get user input, compare to database info
			$http.get('/api/users/'+user.Lname,config).success(function(data){
				myLoginData = data;
				console.log(myLoginData);
				console.log("login successful");
				$scope.validUser = true;
				$scope.postedUser = false;
				sharedVars.validUser = true;
				sharedVars.currentUser.username = data.username;
				sharedVars.currentUser.password = data.password;
				sharedVars.currentUser.trees = data.trees;
			});

		};
	}]);
	app.controller('myTree', ['$scope','$http', 'sharedVars',function ($scope,$http,sharedVars){
		// $http.get('/api/users')
		// 	.success(function(data){
		// 		$scope.trees = data;
		// 		console.log(data);
		// 	})
		// 	.error(function(data){
		// 		console.log('Error: '+data);
		// 	});

		$scope.sharedVars = sharedVars;
		console.log($scope.sharedVars.currentUser);

		$scope.populateTrees = function(){

		};

		$scope.treeId = function(){
			$http.get('/api/users/'+$scope.sharedVars.currentUser+'/trees').success(function(data){
				$scope.numberOfTrees = data.trees.length;
			});
			return $scope.numberOfTrees;
		};

		$scope.createTree = function(text){
			$http.post('/api/users/'+$scope.sharedVars.currentUser+'/trees',JSON.stringify(text));
		};

		$scope.water = 0;
		$scope.sun = 0;
		$scope.addWater = function(num){
			$scope.water += num;
		};
		$scope.addSun = function(num){
			$scope.sun += num;
		};
		$scope.fungi = 1;
		$scope.addFungi = function(){
			if($scope.water > 10 && $scope.sun > 10){
				var max = ($scope.water+$scope.sun)/10;
				$scope.fungi++;//= Math.trunc(Math.random()*(max));
				$scope.water -= 10;
				$scope.sun -= 10;
			} else {
				alert("Fungi help you grow, but food and water need to show.");
			}
		};
		$scope.load = function() {
			canvas = document.getElementById("forest");
			context = canvas.getContext('2d');
			var tree = document.getElementById("tree");
			context.drawImage(tree,(canvas.width)/2-50,150);
		};
		$scope.friends = 0;
		$scope.makeFriends = function(){
			if($scope.fungi > $scope.friends){
				$scope.drawTree();
				//var treeId = $scope.treeId();
				var tree = {"fungi":$scope.fungi};
				$scope.createTree(tree);
				$scope.friends++;
				$scope.fungi = 0;
			} else {
				alert("Friends without Fungi make an Unfun-guy");
			}
		};
		$scope.drawTree = function(){
			canvas = document.getElementById("forest");
			context = canvas.getContext('2d');
			var tree = document.getElementById("tree");
			var x = $scope.random(canvas.width-100,0);
			var y = $scope.random(canvas.height-141,0);
			context.drawImage(tree,x,y);
			// var location = {"x":x, "y":y};
			// return location;
		};
		$scope.random = function(max,min){
			return Math.random() * (max - min) + min;
		};

	}]);




