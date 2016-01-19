var myApp = angular.module('myApp',[
	'ngRoute',//take care of deep linking
	'joblistControllers',//javascript that is going to handle this module
	'ngGeolocation'
	]);

myApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/list',{
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	}).
	when('/details/:itemId',{
		templateUrl: 'partials/details.html',
		controller: 'DetailsController'
	}).
	otherwise({
		redirectTo: '/list'
	});
}]);