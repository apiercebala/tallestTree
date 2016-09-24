angular.module("services",[])
	.value("water",0)
	.factory("addWater",["water", function(water){
		return water++;
	}]);