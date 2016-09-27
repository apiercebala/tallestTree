var app = angular.module('myGame',[]);
	app.controller('myTree', ['$scope','$http', function ($scope,$http){
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
				var tree = {"forest":"tree"};
				$scope.friends++;
				$http.createTree(tree);
			} else {
				alert("Friends without Fungi make an Unfun-guy");
			}
		};
		$scope.drawTree = function(){
			canvas = document.getElementById("forest");
			context = canvas.getContext('2d');
			var tree = document.getElementById("tree");
			context.drawImage(tree,$scope.random(canvas.width-100,0),$scope.random(canvas.height-141,0));			
		};
		$scope.random = function(max,min){
			return Math.random() * (max - min) + min;
		};
}]);




