var wirknControllers = angular.module('wirknControllers',[]);

<<<<<<< HEAD
wirknControllers.controller('ListController',
                              ['$scope', '$routeParams', '$location', '$cookies',
                               '$uibModal', 'JobService', 'LocationService',
                               'LocaleService', 'ModalService', 'KikService',
                               function($scope, $routeParams, $location, $cookies,
                                        $uibModal, JobService, LocationService,
                                        LocaleService, ModalService, KikService) {

    $scope.pageClass = 'page-list';

    LocaleService.setLocale($routeParams.locale);
    $scope.currentLocale = LocaleService.getLocale();

    $scope.pauseScroll = false;

    // Define function to get jobs and assign $scope variables
    var getJobs = function(coords, searchTerm) {
        JobService.getData(coords.latitude, coords.longitude, searchTerm).then(function onSuccess(data) {
            $scope.joblist = data;
            $scope.searchTerm = searchTerm;
            $('.pre-load').remove();
        }, function onError(response) {
            $scope.error = "failed to get data";        
        });

        JobService.getCity(coords.latitude, coords.longitude).then(function(city) {
            $scope.city = city;
        }, function(response) {
            console.log(response);
        });
    };

    // Get all parameters and search
    var searchTerm = '';
    if ($routeParams.searchTerm) {
        if ($routeParams.searchTerm.toLowerCase() === 'all') {
            $scope.searchTerm = $routeParams.searchTerm;
        }
        else {
            searchTerm = $scope.searchTerm = $routeParams.searchTerm;
        }
        $scope.searchTermVisible = true;
    }
    else if($location.search().q) {
        if ($location.search().q.toLowerCase() === 'all') {
            $scope.searchTerm = $location.search().q;
        }
        else {
            searchTerm = $scope.searchTerm = $location.search().q;
        }
        $scope.searchTermVisible = true;
    }

    if ($cookies.get('lat') && $cookies.get('lon')) {
        var coords = {
            latitude: Number($cookies.get('lat')),
            longitude: Number($cookies.get('lon'))
        };
        getJobs(coords, searchTerm);
    }
    else {
        var coordinates = LocationService.getCoordinates().then(function(coords) {
            $cookies.put('lat', coords.latitude);
            $cookies.put('lon', coords.longitude);
            getJobs(coords, searchTerm);
        });
    }

    // Infinite scrolling
    $scope.getMoreJobs = function() {
        $scope.pauseScroll = true;
        var offset = $scope.joblist.length;
        var lat = Number($cookies.get('lat'));
        var lon = Number($cookies.get('lon'));
        JobService.getData(lat, lon, searchTerm, offset).then(function(data) {
            Array.prototype.push.apply($scope.joblist, data);
            $scope.pauseScroll = false;
        });
    }

    // Modal open
    if ($location.search().q && ModalService.openModal()) {
        $scope.message = ModalService.message($location.search().q.toLowerCase());

        ModalService.open($location.search().q.toLowerCase(), 'sm');
    }

    // Analytics
    if ($location.search().kik_username) {
        KikService.setKikUsername($location.search().kik_username);
    }

    KikService.identifyKikUser();

    KikService.track('kik_job_list');
}]);

<<<<<<< HEAD
joblistControllers.controller('DetailsController',
                              ['$scope', '$routeParams', 'JobService',
                               'LocaleService', 'KikService',
                               function($scope, $routeParams, JobService, 
                                        LocaleService, KikService) {
=======
wirknControllers.controller('DetailsController',['$scope', '$routeParams', 'JobService', 'LocaleService', function($scope, $routeParams, JobService, LocaleService) {
>>>>>>> modal

    $scope.pageClass = 'page-details';

    LocaleService.setLocale($routeParams.locale);
    $scope.currentLocale = LocaleService.getLocale();

    $scope.$on('$routeChangeSuccess', function(e, currentRoute, previousRoute) {
        window.scrollTo(0, 0);
    });

    // Analytics
    KikService.identifyKikUser();

    JobService.getDetails($routeParams.itemId).then(function(data) {
        var job = data;
        $scope.job = job;

        KikService.track('kik_job_details', {
            job_id: job._id,
            job_title: job.title,
            job_employer: job.employer.name
        });
    }, function(reason) {
        $scope.error = "failed to get data";        
    });

    branch.init("key_live_nmllYe7xNU5DUy340KNxMenagcpeaP95", function(err, data) {});

    $scope.applyNow = function() {
        KikService.track('kik_apply_now', {
            job_id: $scope.job._id,
            job_title: $scope.job.title,
            job_employer: $scope.job.employer.name
        });

        branch.link({
            channel: 'kik_card',
            campaign: 'personality_quiz',
            stage: 'view publicjob',
            data: {
                '$always_deeplink': true,
                '$desktop_url': 'http://wirkn.com/download-job',
                '$after_click_url': '',
                'employer': $scope.job.employer.name,
                'title': $scope.job.title,
                'location': $scope.job.employer.name,
                'referral_type': "employer",
                'referred_object_id': $scope.job._id,
                'type': "job",
                'data': $scope.job._id,
                'kik_username': "",
                'alias_id': ""
            }
        }, function(err, link) {
            window.location.replace(link);
        });      
    };
}]);

wirknControllers.controller('SearchController', ['$scope', '$routeParams', 'LocaleService', function($scope, $routeParams, LocaleService) {

    $scope.pageClass = 'page-search';

    LocaleService.setLocale($routeParams.locale);
    $scope.currentLocale = LocaleService.getLocale();

    $scope.$on('$routeChangeSuccess', function(e, currentRoute, previousRoute) {
        window.scrollTo(0, 0);
    });

    $scope.categories = [
        {
            name: "partials.search.Food",
            term: "food",
            image: "restaurant"
        },
        {
            name: "partials.search.CoffeeShops",
            term: "coffee+shops",
            image: "coffee"
        },
        {
            name: "partials.search.Bartender",
            term: "bartender",
            image: "bartending"
        },
        {
            name: "partials.search.Nightlife",
            term: "nightlife",
            image: "nightlife"
        },
        {
            name: "partials.search.Cashier",
            term: "cashier",
            image: "cashier"
        },
        {
            name: "partials.search.Hospitality",
            term: "hospitality",
            image: "hospitality"
        },
        {
            name: "partials.search.CustomerSupport",
            term: "customer+support",
            image: "customer_service"
        },
        {
            name: "partials.search.Business",
            term: "business",
            image: "business"
        },
        {
            name: "partials.search.Merchandising",
            term: "merchandising",
            image: "merchandising"
        }
    ];
}]);

wirknControllers.controller('LocationController', ['$scope', '$routeParams', '$location', '$cookies', 'LocaleService', function($scope, $routeParams, $location, $cookies, LocaleService) {
    $scope.pageClass = 'page-location';

    LocaleService.setLocale($routeParams.locale);
    $scope.currentLocale = LocaleService.getLocale();

    $scope.$on('$routeChangeSuccess', function(e, currentRoute, previousRoute) {
        window.scrollTo(0, 0);
    });

    var autoComplete = new google.maps.places.AutocompleteService();
    var places = new google.maps.places.PlacesService($('<div />')[0]);
    
    $scope.getSuggestions = function(query) {

        if (query !== '') {
            
            var searchObj = {
                input: query,
                types: '(cities)'
            };
            
            autoComplete.getQueryPredictions(searchObj, function(predictions, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    console.log('Error retrieving autocomplete: '+ status);
                } else {
                    $scope.$apply(function() {
                        $scope.response = predictions;                
                    });
                }
            });
        }
    };

    $scope.getCoordinates = function(request) {
        places.getDetails(request, function(place, status) {
            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();
            $cookies.put('lat', lat);
            $cookies.put('lon', lon);
            location.replace('#/' + $scope.currentLocale + '/list');
        });
    };

    $scope.useCurrentLocation = function() {
        $cookies.remove('lat');
        $cookies.remove('lon');
        location.replace('#/' + $scope.currentLocale + '/list');
    };
}]);

wirknControllers.controller('ModalInstanceController', ['$scope', '$uibModalInstance', 'message', function($scope, $uibModalInstance, message) {
    
    $scope.message = message;

    $scope.ok = function () {
        if (kik.send) {
            kik.send({
                title: 'My Job Personality',
                text: 'I just took the Wirkn Personality Test and found out what kind of job personality I have — check out my results or give it a try yourself!',
                pic: 'https://wirknintellibot.herokuapp.com/images/wirkn-jobs.png',
                url: location.href
            });
        }
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

