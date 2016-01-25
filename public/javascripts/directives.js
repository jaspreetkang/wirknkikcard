var translateDirectives = angular.module('translateDirectives', []);

translateDirectives.directive('ngTranslateLanguageSelect', ['LocaleService', function (LocaleService) {

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
}]);

var googlePlacesDirectives = angular.module('googlePlacesDirectives', []);

googlePlacesDirectives.directive('ngGoogleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: ['(cities)'],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                var geoComponents = scope.gPlace.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                var addressComponents = geoComponents.address_components;

                addressComponents = addressComponents.filter(function(component){
                    switch (component.types[0]) {
                        case "locality": // city
                            return true;
                        case "administrative_area_level_1": // state
                            return true;
                        case "country": // country
                            return true;
                        default:
                            return false;
                    }
                }).map(function(obj) {
                    return obj.long_name;
                });

                addressComponents.push(latitude, longitude);

                scope.$apply(function() {
                    scope.details = addressComponents; // array containing each location component
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});
