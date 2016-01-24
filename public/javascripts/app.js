var myApp = angular.module('myApp',[
    'ngRoute', // take care of deep linking
    'ngGeolocation',
    'ngCookies',
    'ngSanitize',
    'pascalprecht.translate', // angular-translate
    'tmh.dynamicLocale', // angular-dynamic-locale
    'ui.bootstrap',
    'wirknAnimations',
    'joblistControllers', // javascript that is going to handle this module
    'translateDirectives',
    'jobServices',
    'localeServices',
    'locationServices'
    ])
    .constant('LOCALES', {
        'locales': {
            'en_US': 'English',
            'fr_CA': 'French',
            'ru_RU': 'Russian'
        },
        'preferredLocale': 'fr_CA'
    });

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/list/:searchTerm?', {
        templateUrl: 'partials/list.html',
        controller: 'ListController'
    }).
    when('/details/:itemId', {
        templateUrl: 'partials/details.html',
        controller: 'DetailsController'
    }).
    when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchController'
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
