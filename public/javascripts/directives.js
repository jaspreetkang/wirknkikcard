var wirknDirectives = angular.module('wirknDirectives', []);

wirknDirectives.directive('ngTranslateLanguageSelect', function (LocaleService) {

        return {
            restrict: 'A',
            replace: true,
            template: '' +
            '<div class="language-select" ng-if="visible">' +
                '<label>' +
                    '{{"directives.language-select.Language" | translate}}: ' +
                    '<select class="form-control" ng-model="currentLocaleDisplayName"' +
                        'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
                        'ng-change="changeLanguage(currentLocaleDisplayName)">' +
                    '</select>' +
                '</label>' +
            '</div>' +
            '',
            controller: function ($scope) {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames &&
                $scope.localesDisplayNames.length > 1;
    
                $scope.changeLanguage = function (locale) {
                    LocaleService.setLocaleByDisplayName(locale);
                };
            }
        };
});

wirknDirectives.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});

wirknDirectives.directive('focus', function($timeout) {
    return {
        scope : {
            trigger : '@focus'
        },
        link : function(scope, element) {
            scope.$watch('trigger', function(value) {
                if (value === "true") {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };
});

module.exports = wirknDirectives;
