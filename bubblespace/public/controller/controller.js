var crudApp = angular.module('crudApp',[]);

crudApp.controller('AppCtrl',['$scope','$http', function($scope,$http){
    console.log("Hello from controller");

    $http.get('/objectlist').success(function(res){
        console.log("Obtained data");
        $scope.objectList = res;
    });

    $scope.addObject = function(){
        console.log($scope.object);
        $http.post('/objectlist', $scope.object)
    }

}]);

