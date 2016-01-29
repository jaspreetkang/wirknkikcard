var wirknApp = angular.module('wirknApp',[
    'ngRoute',
    'ngGeolocation',
    'ngCookies',
    'ngSanitize',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ui.bootstrap',
    'wirknAnimations',
    'wirknControllers',
    'wirknDirectives',
    'wirknServices'
    ])
    .constant('LOCALES', {
        'locales': {
            'en': 'English',
            'fr': 'French',
            'ru': 'Russian'
        },
        'preferredLocale': 'en'
    });

wirknApp.config(['$routeProvider', 'LOCALES', function($routeProvider, LOCALES){
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
    when('/:locale/location', {
        templateUrl: 'partials/location.html',
        controller: 'LocationController'
    }).
    otherwise({
        redirectTo: '/' + LOCALES.preferredLocale + '/list'
    });
}]);

wirknApp.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
}]);

wirknApp.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
}]);

wirknApp.config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');
}]);

