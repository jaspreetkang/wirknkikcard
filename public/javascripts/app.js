var myApp = angular.module('myApp',[
	'ngRoute',//take care of deep linking
	'joblistControllers',//javascript that is going to handle this module
	'ngGeolocation',
	'ui.bootstrap'
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
	when('/list/:message',{
		templateUrl: 'partials/message.html',
		controller: 'ModalMessageController'
	}).
	when('/list/:category',{
		templateUrl: 'partials/categories.html',
		controller: 'CategoriesController'
	}).
	when('/list/:location',{
		templateUrl: 'partials/locations.html',
		controller: 'LocationsController'
	}).
	otherwise({
		redirectTo: '/list'
	});
}]);