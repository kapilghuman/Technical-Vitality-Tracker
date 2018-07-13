angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	});
	
	$routeProvider.when('/login', {
		templateUrl: 'app/views/pages/users/login.html'
	});
	
	$routeProvider.when('/abc', {
		templateUrl: 'app/views/pages/users/abc.html'
	});
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
