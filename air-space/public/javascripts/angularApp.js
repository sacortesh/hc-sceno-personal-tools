var app = angular.module('weekendAttack', ['ui.router', 'ui.bootstrap']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
		.state('home',{
			url: '/home',
			templateUrl: 'partials/home.html',
			controller: 'MainCtrl',
			resolve: {
				objectPromise: ['objects', function(objects){
					return objects.getAll();
				}]
			}
		});

		$stateProvider.state('objects', {
			url: '/objects/{id}',
			templateUrl: 'partials/objects.html',
			controller: 'ObjectsCtrl',
			resolve: {
				object: ['$stateParams', 'objects', function($stateParams, objects){
					return objects.get($stateParams.id);
				},
				],
				ip: ['tools', function(tools){
					return tools.getIPLocal();
				},
				]
			}
		});
		$urlRouterProvider.otherwise('home');
	}]);

app.controller('MainCtrl', ['$scope', 'objects', function($scope, objects){
	$scope.locked = true;

	$scope.objects = objects.objects;

	$scope.addObject = function(){
		//Verifications
		if(!$scope.name || $scope.name === ''){return;}


		objects.create({
			name: $scope.name,
			description: $scope.description,
		});

		//Clean up
		$scope.name = '';
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


//Attention to the mapping, it can get confusing.
app.controller('ObjectsCtrl',[
	'$scope',
	'objects',
	'object',
	'ip',
	function($scope, objects, object, ip){
		$scope.obj = object;
		$scope.ip = ip;

		$scope.addSpec = function (){
			//Verify non-value specs
			if($scope.value === ''){return;}

			objects.addSpec(object._id,{
				name: $scope.name,
				value: $scope.value,
				isImg: $scope.isImg
			}).success(function(spec){
				$scope.obj.specs.push(spec);
			});

			//Reset
			$scope.name = '';
			$scope.value = '';
			$scope.isImg = false;

		};

		$scope.addStat = function (){
			//Verify non-value specs
			if($scope.value === '' || $scope.name === '' ||
				$scope.val_min === '' || $scope.val_max === '' ||
				$scope.url_interaction || $scope.field){
				console.log("Imprime esto");

				return;}

			console.log("Imprime esto:" + $scope.name);

			objects.addStat(object._id, {
				name: $scope.name,
				val_min: $scope.val_min,
				val_max: $scope.val_max,
				url_interaction: $scope.url_interaction,
				field: $scope.field,
				unit: $scope.unit
			}).success(function(stat){
				$scope.obj.stats.push(stat);
			});

			//Reset
			$scope.name = '';
			$scope.val_min = '';
			$scope.val_max = '';
			$scope.url_interaction= '';
			$scope.field = '';
			$scope.unit = '';

		};


	}]);

app.factory('objects', ['$http', function($http){
	var o = {
		objects: []
	};

	o.getAll = function(){
		return $http.get('/api/objects').success(function(data){
			angular.copy(data, o.objects);
		});
	};

	o.create = function(obj){
		return $http.post('/api/objects', obj).success(function(data){
			o.objects.push(data);
		});
	};

	o.get = function(id){
		return $http.get('/api/objects/' + id).then(function(res){
			return res.data;
		});
	};

	o.addSpec = function(id, spec){
		return $http.post('/api/objects/' +id + '/specs', spec);
	};

	o.addStat = function(id, stat){
		return $http.post('/api/objects/' +id + '/stats', stat);
	};

	return o;
}]);

app.factory('tools', ['$http', function($http){
	var t = {
	};

	t.getIPLocal = function(){
		return $http.get('/api/ip').then(function(res){
			return res.data.ip;
		});
	};

	return t;
}]);