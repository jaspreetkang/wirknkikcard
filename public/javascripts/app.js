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
            'en': 'English',
            'fr': 'French',
            'ru': 'Russian'
        },
        'preferredLocale': 'en'
    });

myApp.config(['$routeProvider', 'LOCALES', function($routeProvider, LOCALES){
    $routeProvider.
    when('/:locale/list/:searchTerm?', {
        templateUrl: 'partials/list.html',
        controller: 'ListController'
    }).
    when('/:locale/details/:itemId', {
        templateUrl: 'partials/details.html',
        controller: 'DetailsController'
    }).
    when('/:locale/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchController'
    }).
    otherwise({
        redirectTo: '/' + LOCALES.preferredLocale + '/list'
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

