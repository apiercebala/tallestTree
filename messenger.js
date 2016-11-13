angular.module('messenger', ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider.when("/send", {
        controller: "sendController",
        templateUrl: "sendMessage.html"
    });

    $routeProvider.when("/inbox", {
        controller: "inboxController",
        templateUrl: "inbox.html"
    });

    //$routeProvider.sendMessage() = function () {
   //     alert("hello");
    //}
})
.controller('messengerController', function ($scope) {
})
.controller('sendController', ['$scope','$http', function ($scope,$http) {
    $scope.header = "Send Message";
    $scope.send = function () {
        var d = new Date();
        var date = d.getHours() + ":" + d.getMinutes();
        var data = {
            "receiver": $scope.receiver,
            "time":date,
            "message":$scope.message,
        }
        //alert(data.receiver + data.time + data.message);
        $http.post('/api/messages', JSON.stringify(data)).success(function (data, status) {
            //myData = data;
            //console.log(myData);
            console.log("Post success!");
            //$scope.postedUser = true;
        });
    }

}])
.controller('inboxController', ['$scope','$http', function ($scope,$http){
    $scope.header = "Inbox";
    //$scope.messages = "No message";
    $http.get('/api/messages')
			.success(function (data) {
			    $scope.messages = data;
			    console.log(data);
			})
			.error(function (data) {
			    console.log('Error: ' + data);
			});

}]);
