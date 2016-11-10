angular.module("services",[])
	.value("water",0)
	.factory("random",["water", function(max,min){
		return water++;
	}]);