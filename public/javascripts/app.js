var myApp = angular.module('myApp',[
	'ngRoute', // take care of deep linking
	'ngGeolocation',
    'ngCookies',
    'pascalprecht.translate', // angular-translate
    'tmh.dynamicLocale', // angular-dynamic-locale
	'joblistControllers', // javascript that is going to handle this module
	'ui.bootstrap',
    'jobServices',
    'translateDirectives',
    'localeServices'
	])
    .constant('LOCALES', {
        'locales': {
            'en_US': 'English'
        },
        'preferredLocale': 'en_US'
    });

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/list', {
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	}).
	when('/details/:itemId', {
		templateUrl: 'partials/details.html',
		controller: 'DetailsController'
	}).
	when('/list/:message', {
		templateUrl: 'partials/message.html',
		controller: 'ModalMessageController'
	}).
	when('/list/:category', {
		templateUrl: 'partials/categories.html',
		controller: 'CategoriesController'
	}).
	when('/list/:location', {
		templateUrl: 'partials/locations.html',
		controller: 'LocationsController'
	}).
	otherwise({
		redirectTo: '/list'
	});
}]);

myApp.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
}]);

myApp.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en_US');
    $translateProvider.useLocalStorage();
}]);

myApp.config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');
}]);
