var app = angular.module('weekendAttack', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
		.state('home',{
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});

		$stateProvider.state('objects', {
			url: '/objects/{id}',
			templateUrl: '/objects.html',
			controller: 'ObjectsCtrl'
		});

		$urlRouterProvider.otherwise('home');
	}]);

app.controller('MainCtrl', ['$scope', 'objects', function($scope, objects){
	$scope.locked = true;

	$scope.objects = objects.objects;

	$scope.addObject = function(){
		//Verifications
		if(!$scope.title || $scope.title === ''){return;}


		$scope.objects.push({
			title: $scope.title,
			description: $scope.description,
			priority:0,
			specs: [
			{name: 'Height', value: 'Very Tall', isImg: false},
			{name: 'Color', value: 'Black', isImg: false},
			{name: 'Image', value: 'http://www.bodyrock.tv/wp-content/uploads/2013/06/Funny-Picture-Spirit-of-Baby.jpg', isImg: true}
			]
		});
		$scope.title = '';
		$scope.description = '';
	};

	$scope.incrementPriority = function(obj){
		obj.priority -= 1;
	};

	$scope.decreasePriority = function(obj){
		obj.priority += 1;
	};

	$scope.lockInterface = function(){
		$scope.locked = !$scope.locked;
	};
}]);

app.controller('ObjectsCtrl',[
	'$scope',
	'$stateParams',
	'objects',
	function($scope,$stateParams, objects){
		$scope.obj = objects.objects[$stateParams.id];

		$scope.addSpec = function (){
			//Verify non-value specs
			if($scope.value === ''){return;}
			$scope.obj.specs.push({
				name: $scope.name,
				value: $scope.value,
				isImg: $scope.isImg
			});

			//Reset
			$scope.name = '';
			$scope.value = '';
			$scope.isImg = false;

		};


	}]);

app.factory('objects', [function(){
	var o = {
		objects: [

		{
			title: 'Chair',
			priority: 4
		},
		{
			title: 'FauxLamp',
			priority: 3
		},
		{
			title: 'LedBox',
			priority: 2
		},
		{
			title: 'Magestic',
			priority: 1
		}

		]

	};
	return o;
}]);