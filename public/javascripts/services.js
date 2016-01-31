var wirknServices = angular.module('wirknServices', []);

wirknServices.service('JobService', function($q, $http, $cacheFactory) {
    var city = '';
    this.cache = $cacheFactory('jobData');
    var self = this;

    var fetchData = function(url, cacheKey, condition) {
        if (typeof condition === 'undefined') {
            condition = true;
        }

        var defer = $q.defer();

        var cachedData = self.cache.get(cacheKey);

        if (cachedData && condition) {
            defer.resolve(cachedData);
        }
        else {
            $http.get(url).then(function(response) {
                self.cache.put(cacheKey, response);
                defer.resolve(response);
            }, function(response) {
                defer.reject(response);
            });
        }

        return defer.promise;
    };

    var getData = function(lat, lon, searchTerm, offset) {
        var defer = $q.defer();

        lat = lat.toFixed(3);
        lon = lon.toFixed(3);

        var cacheKey = 'jobs-' + searchTerm + '-' + offset;
        var condition = lat == self.latitude && lon == self.longitude;

        self.latitude = lat || '';
        self.longitude = lon || '';
        self.searchTerm = searchTerm || '';
        self.offset = offset || '00';

        var urlParts = [
            '/getJobs',
            '?lat=' + self.latitude,
            '&lon=' + self.longitude,
            '&offset=' + self.offset
        ];

        if (self.searchTerm.length > 0) {
            urlParts.push('&q=' + self.searchTerm);
        }

        var url = urlParts.join('');

        fetchData(url, cacheKey, condition)
        .then(function(response) {
            defer.resolve(response.data);
        }, function(response) {
            defer.reject(response);
        });

        return defer.promise;
    };

    var getDetails = function(id) {
        var defer = $q.defer();

        var url = '/getJobs/' + id;
        var cacheKey = 'jobid-' + id;

        fetchData(url, cacheKey).then(function(response) {
            defer.resolve(response.data);
        }, function(response) {
            defer.reject(response);
        });

        return defer.promise;
    };

    var getCity = function(lat, lon) {
        var defer = $q.defer();
        var condition = lat == self.latitude && lon == self.longitude;

        if (city && condition) {
            defer.resolve(city);
        }
        else {
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lon).then(function(response) {
                var results = response.data.results;
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                        if (results[0].address_components[i].types[b] == "locality") {
                            city = results[0].address_components[i].long_name;
                            break;
                        }
                    }
                }
                defer.resolve(city);
            }, function(response) {
                defer.reject(response);
            });
        }

        return defer.promise;
    };

    return {
        getData: getData,
        getDetails: getDetails,
        getCity: getCity
    };
});

wirknServices.service('LocaleService', function($translate, LOCALES, $rootScope, tmhDynamicLocale) {
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
        },
        setLocale: function(locale) {
            setLocale(locale);
        },
        getLocale: function() {
            return currentLocale;
        }
    };
});

wirknServices.service('LocationService', function($q, $geolocation) {
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
    };

    var getCoordinates = function() {
        var defer = $q.defer();
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
                defer.reject(position);
            });
        }
        return defer.promise;
    };

    return {
        getCoordinates: getCoordinates,
        initializeLocation: initializeLocation
    };
});

wirknServices.service('ModalService', function($uibModal) {
    
    var modalShouldOpen = true;

    var messages = {
        "retail": {
            "title": "partials.list.Standout.title",
            "body": "partials.list.Standout.body",
            "image": "/images/modal-photos/fashion.png"
        },
        "restaurant": {
            "title": "partials.list.Charmer.title",
            "body": "partials.list.Charmer.body",
            "image": "/images/modal-photos/restaurant.png"
        },
        "event": {
            "title": "partials.list.PartyAnimal.title",
            "body": "partials.list.PartyAnimal.body",
            "image": "/images/modal-photos/events.png"
        },
        "all": {
            "title": "partials.list.Idealist.title",
            "body": "partials.list.Idealist.body",
            "image": "/images/modal-photos/alljobs.png"
        }
    };

    var message = function(key) {
        return messages[key];
    };

    var openModal = function() {
        return modalShouldOpen;
    };

    var open = function(key, size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceController',
            size: size,
            resolve: {
                message: function () {
                    return message(key);
                }
            }
        });
        modalShouldOpen = false;
    };

    return {
        openModal: openModal,
        message: message,
        open: open
    };
});

wirknServices.service('KikService', function($cookies) {
    var setKikUsername = function(value) {
        $cookies.put("kikUsername", value);
    };

    var getKikUsername = function() {
        return $cookies.get("kikUsername");
    };

    var identifyKikUser = function() {
        if (kik.enabled) {
            kik.getUser(function(user) {
                if (!user) {
                    if (getKikUsername()) {
                        analytics.identify(getKikUsername());
                    }
                }
                else {
                    analytics.identify(user.username, {
                        name: user.fullName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        kik_username: user.username
                    });
                }
            });
        }
    };

    var track = function(event, properties, options, cb) {
        analytics.track(event, properties, options, cb);
    };

    return {
        setKikUsername: setKikUsername,
        getKikUsername: getKikUsername,
        identifyKikUser: identifyKikUser,
        track: track
    };
});

module.exports = wirknServices;
