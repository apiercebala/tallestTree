var app = angular.module('myGame',[]);
	app.controller('mySignUp',['$scope','$http',function($scope,$http){
		$scope.signup = function(user){
			console.log(user);
			//$http.post('/api/users',JSON.stringify(user));
			$http({
				url:'/api/users',
				method:"POST",
				params:{username:user.name, password:user.password}
			});
		};
	}]);
	app.controller('mySignIn',['$scope','$http','$q',function($scope,$http,$q){
		$scope.signin = function(user){
			var defer = $q.defer();
			$http.get('/api/users',{params: JSON.stringify(user)}).success(function(data){
				defer.resolve(data);
			});
			return defer.user;
		};
	}]);
	app.controller('myTree', ['$scope','$http',function ($scope,$http){
		$http.get('/api/trees')
			.success(function(data){
				$scope.trees = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: '+data);
			});

		$http.createTree = function(text){
			$http.post('/api/trees',JSON.stringify(text));
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
				var tree = {"forest":"tree", "fungi":$scope.fungi, "x":x, "y":y};
				$http.createTree(tree);
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
			var location = {"x":x, "y":y};
			return location;			
		};
		$scope.random = function(max,min){
			return Math.random() * (max - min) + min;
		};
	}]);




