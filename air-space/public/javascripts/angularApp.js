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

		$stateProvider.state('rendered', {
			url: '/rendered/{id}',
			templateUrl: 'partials/rendered.html',
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
		$scope.data = {};

		$scope.obj.actions.forEach(function(action){
			console.log(action.name +"is being processed");

			var slider = new Slider("#"+ action.name, {
				formatter: function(value) {
					return 'Current value: ' + value;
				}
			});

		});


		$scope.addSpec = function (){
			//Verify non-value specs
			if($scope.data.value === ''){return;}

			objects.addSpec(object._id,{
				name: $scope.data.name,
				value: $scope.data.value,
				isImg: $scope.data.isImg
			}).success(function(spec){
				$scope.obj.specs.push(spec);
			});

			//Reset
			$scope.data.name = '';
			$scope.data.value = '';
			$scope.data.isImg = false;

		};

		$scope.addStat = function (){
			//Verify non-value specs
			if($scope.data.name === '' ||
				$scope.data.val_min === '' || $scope.data.val_max === '' ||
				$scope.data.url_interaction === ''|| $scope.data.field === ''){
				console.log("Imprime esto");

			return;}

			console.log("Imprime esto:" + $scope.data.name);

			objects.addStat(object._id, {
				name: $scope.data.name,
				val_min: $scope.data.val_min,
				val_max: $scope.data.val_max,
				url_interaction: $scope.data.url_interaction,
				field: $scope.data.field,
				unit: $scope.data.unit
			}).success(function(stat){
				$scope.obj.stats.push(stat);
			});

			//Reset
			$scope.data.name = '';
			$scope.data.val_min = '';
			$scope.data.val_max = '';
			$scope.data.url_interaction= '';
			$scope.data.field = '';
			$scope.data.unit = '';

		};

		$scope.addAction = function (){
			//Verify non-value specs
			if($scope.data.name === '' ||
				$scope.data.val_min === '' || $scope.data.val_max === '' ||
				$scope.data.url_interaction === ''|| $scope.data.field === ''){
				console.log("FE: addAction() Verification error");
			return;}

			objects.addAction(object._id,{
				name: $scope.data.name,
				val_min: $scope.data.val_min,
				val_max: $scope.data.val_max,
				step: $scope.data.step,
				url_interaction: $scope.data.url_interaction,
				field: $scope.data.field,
				unit: $scope.data.unit
			}).success(function(spec){
				$scope.obj.actions.push(spec);
			});

			//Reset
			$scope.data.name = '';
			$scope.data.val_min = '';
			$scope.data.val_max = '';
			$scope.data.step = '';
			$scope.data.url_interaction= '';
			$scope.data.field = '';
			$scope.data.unit = '';

		};

		$scope.setMisc = function (){
			//Verify non-value specs
			if($scope.data.url === ''){return;}

			objects.setMisc(object._id,{
				url: $scope.data.url,
			}).success(function(spec){
				$scope.obj.miscs = spec;
			});

			//Reset
			$scope.data.url = '';
		};

		$scope.statusManager = function(status){
			$( document ).ready(function () {
				RTProgress(status.url_interaction, status.name+"Bar", status.field, status.unit, status.val_max - status.val_min, 2000);
			})

		};



		$scope.actionManager = function(action){

			$( document ).ready(function () {
				console.log(action);
				$("#"+ action.name)
				.on("slideStop", function(slideEvt){
					onSlide(action.url_interaction, slideEvt.value);
				});


				RTSlider(action.url_interaction, action.field, action.name, 2000);
			}

			)};

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

	o.addAction = function(id, stat){
		return $http.post('/api/objects/' +id + '/actions', stat);
	};

	o.setMisc = function(id, stat){
		return $http.post('/api/objects/' +id + '/misc', stat);
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