var app = angular.module('myGame',[]);
	app.service('sharedVars',function(){
		var postedUser = true;
		var validUser = true;
		return {
			postedUser: true,
			totalTrees: 0,
			validUser: true,
			currentUser: {
				username: "user",
				password: "password",
				trees: [],
				fungi: 0,
				water: 0,
				sun: 0
			},
			updateVar: function(newValue){
				return newValue;
			}
		};

	});
	app.controller('mySignUp',['$scope','$http','sharedVars',function($scope,$http,sharedVars){

		$scope.postedUser = sharedVars.postedUser;
		$scope.validUser = sharedVars.validUser;
		console.log($scope.currentUser);
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
				sharedVars.totalTrees = sharedVars.currentUser.trees.length;
				sharedVars.currentUser.fungi = data.fungi;
				sharedVars.currentUser.water = data.water;
				sharedVars.currentUser.sun = data.sun;

				for (var i = 0; i < sharedVars.currentUser.trees.length; i++){
					$scope.drawTree();
				}
			});

		};

		$scope.drawTree = function(){
			canvas = document.getElementById("forest");
			context = canvas.getContext('2d');
			var tree = document.getElementById("tree");
			var x = $scope.random(canvas.width-100,0);
			var y = $scope.random(canvas.height-141,0);
			context.drawImage(tree,x,y);
		};
		$scope.random = function(max,min){
			return Math.random() * (max - min) + min;
		};
	}]);

	app.controller('myTree', ['$scope','$http','$window','sharedVars',function ($scope,$http,$window,sharedVars){


		$scope.sharedVars = sharedVars;

		$scope.treeId = function(){
			$http.get('/api/users/'+$scope.sharedVars.currentUser.username+'/trees').success(function(data){
				$scope.numberOfTrees = data.trees.length;
			});
			return $scope.numberOfTrees;
		};

		$scope.createTree = function(text){
			$http.post('/api/users/'+$scope.sharedVars.currentUser.username+'/trees',JSON.stringify(text)).success(function(data){
				sharedVars.currentUser.trees = data.trees;
			});
		};

		$scope.water = $scope.sharedVars.currentUser.water;
		$scope.sun = $scope.sharedVars.currentUser.sun;
		$scope.addWater = function(num){
			$scope.water += num;
			console.log('sharedvars water:'+$scope.sharedVars.currentUser.water);
			console.log('localscope water:'+$scope.water);
		};
		$scope.addSun = function(num){
			$scope.sun += num;
			console.log('sharedvars sun:'+$scope.sharedVars.currentUser.sun);
			console.log('local scope sun:'+$scope.sun);
		};
		$scope.fungi = $scope.sharedVars.currentUser.fungi;
		$scope.addFungi = function(){
			if($scope.water > 10 && $scope.sun > 10){
				var max = ($scope.water+$scope.sun)/10;
				$scope.fungi++;
				$scope.water -= 10;
				$scope.sun -= 10;
			} else {
				alert("Fungi help you grow, but food and water need to show.");
			}
			console.log('sharedvars fungi:'+$scope.sharedVars.currentUser.fungi);
			console.log('local scope gungi:'+$scope.fungi);
		};
		$scope.load = function() {
			canvas = document.getElementById("forest");
			context = canvas.getContext('2d');
			var tree = document.getElementById("tree");
			context.drawImage(tree,(canvas.width)/2-50,150);
		};

		$scope.makeFriends = function(){
			if($scope.fungi > sharedVars.currentUser.trees.length){
				$scope.drawTree();
				var tree = {"fungi":$scope.fungi};
				$scope.createTree(tree);
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
		};

		$scope.random = function(max,min){
			return Math.random() * (max - min) + min;
		};

		$scope.logout = function(){
			$scope.updateUser();
			$window.location.reload();
		};

		$scope.addHealth = function(user,tree) {
			console.log("sfdgfd");
			tree.fungi += $scope.fungi;
			$scope.fungi = 0;
			console.log(tree.fungi);
			$scope.updateUser();
		};

		$scope.updateUser = function(){
			$http.post('/api/users/'+$scope.sharedVars.currentUser.username+'/update',sharedVars.currentUser).success(function(data){
				console.log(data);
			});
		}

	}]);




