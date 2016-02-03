require('angular');
require('angular-route');
require('angular-animate');
require('angular-bootstrap');
require('angular-cookies');
require('angular-dynamic-locale');
require('angular-resource');
require('angular-sanitize');
require('angular-simple-format');
require('angular-translate');
require('angular-translate-handler-log');
require('angular-translate-loader-static-files');
require('angular-translate-storage-cookie');
require('angular-translate-storage-local');
require('ngGeolocation');
require('ngInfiniteScroll');

require('../dist/partials/templateCachePartials');
require('./services');
require('./animations');
require('./directives');
require('./controllers');

var wirknApp = angular.module('wirknApp', [
    'ngRoute',
    'ngGeolocation',
    'ngCookies',
    'ngSanitize',
    'simpleFormat',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'infinite-scroll',
    'ui.bootstrap',
    'wirknPartials',
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

wirknApp.config(function($routeProvider, LOCALES){
    $routeProvider.
    when('/:locale/list/:searchTerm?', {
        templateUrl: '/partials/list.html',
        controller: 'ListController'
    }).
    when('/:locale/details/:itemId', {
        templateUrl: '/partials/details.html',
        controller: 'DetailsController'
    }).
    when('/:locale/search', {
        templateUrl: '/partials/search.html',
        controller: 'SearchController'
    }).
    when('/:locale/location', {
        templateUrl: '/partials/location.html',
        controller: 'LocationController'
    }).
    otherwise({
        redirectTo: '/' + LOCALES.preferredLocale + '/list'
    });
});

wirknApp.config(function($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
});

wirknApp.config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
});

wirknApp.config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');
});

