var app = angular.module('myGame',[]);
	app.controller('myTree', ['$scope', function ($scope){
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
				$scope.fungi += Math.trunc(Math.random()*(max));
				$scope.water = 0;
				$scope.sun = 0;
			}
		};
	}
]);
	// app.controller('myCanvas',['$scope', function($scope)
	// 		newT = new Image();
	// 		newT.src = 'tree1.png';
	// 		$scope.tree = newT;
	// 	])