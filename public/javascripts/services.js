var jobServices = angular.module('jobServices', []);

jobServices.service('JobService', ['$q', '$http', '$cacheFactory', function($q, $http, $cacheFactory) {
    this.cache = $cacheFactory('jobData');
    var self = this;

    return {
        getData: function(lat, lon, searchTerm) {
            var defer = $q.defer();
            lat = lat.toFixed(3);
            lon = lon.toFixed(3);
            //searchTerm = '';
            if (lat == self.latitude && lon == self.longitude && searchTerm == self.searchTerm) {
                defer.resolve(self.cache.get('jobs'));
                return defer.promise;
            }
            self.latitude = lat || '';
            self.longitude = lon || '';
            self.searchTerm = searchTerm || '';
            $http.get('/getData?lat=' + self.latitude + '&lon=' + self.longitude + '&q=' + self.searchTerm)
            .then(function(response) {
                self.cache.put('jobs', response.data);
                defer.resolve(response.data);
            }, function(response) {
                console.log(response);
                defer.reject();
            });

            return defer.promise;
        },

        getDetails: function() {
            var defer = $q.defer();
            defer.resolve(self.cache.get('jobs'));
            return defer.promise;
        }
    };
}]);

var localeServices = angular.module('localeServices', []);
localeServices.service('LocaleService', ['$translate', 'LOCALES', '$rootScope', 'tmhDynamicLocale', function($translate, LOCALES, $rootScope, tmhDynamicLocale) {
    // Prepare Locales Info
    var localesObj = LOCALES.locales;

    var _LOCALES = Object.keys(localesObj);
    if(!_LOCALES || _LOCALES.length === 0) {
        console.error('There are no _LOCALES provided');
    }
    var _LOCALES_DISPLAY_NAMES = [];
    _LOCALES.forEach(function(locale) {
        _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
    });

    // Storing current locale
    var currentLocale = $translate.proposedLanguage();

    // Methods
    var checkLocaleIsValid = function(locale) {
        return _LOCALES.indexOf(locale) !== -1;
    };

    var setLocale = function(locale) {
      if (!checkLocaleIsValid(locale)) {
          console.error('Locale name "' + locale + '" is invalid');
          return;
      }
      currentLocale = locale;// updating current locale
    
      // asking angular-translate to load and apply proper translations
      $translate.use(locale);
    };

    // EVENTS
    // on successful applying translations by angular-translate
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html
    
         // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
        tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
    });
    
    return {
        getLocaleDisplayName: function () {
            return localesObj[currentLocale];
        },
        setLocaleByDisplayName: function (localeDisplayName) {
            setLocale(
                _LOCALES[
                    _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
                ]
            );
        },
        getLocalesDisplayNames: function () {
            return _LOCALES_DISPLAY_NAMES;
        }
    };
}])

var locationServices = angular.module('locationServices', []);

locationServices.service('LocationService', ['$q', '$geolocation', function($q, $geolocation) {
    var latitude = 0;
    var longitude = 0;
    var locationIsInitialized = false;

    var initializeLocation = function() {
        var defer = $q.defer();
        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            locationIsInitialized = true;

            defer.resolve(position);
        }, function(position) {
            defer.reject(position);
        });

        return defer.promise;
    }

    var getCoordinates = function() {
        var defer = $q.defer()
        if (locationIsInitialized) {
            defer.resolve({
                latitude: latitude,
                longitude: longitude
            });
        } 
        else {
            initializeLocation().then(function(position) {
                defer.resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function(position) {
                console.log(position);
                defer.reject(position);
            });
        }
        return defer.promise;
    };

    return {
        getCoordinates: getCoordinates,
        initializeLocation: initializeLocation
    };
}]);
