var joblistControllers = angular.module('joblistControllers',[]);

joblistControllers.controller('ListController', ['$scope', '$routeParams', 'JobService', 'LocationService', function($scope, $routeParams, JobService, LocationService){

    $scope.pageClass = 'page-list';

    var searchTerm = '';
    if ($routeParams.searchTerm) {
        searchTerm = $scope.searchTerm = $routeParams.searchTerm;
        $scope.searchTermVisible = true;
    }

    var coordinates = LocationService.getCoordinates().then(function(coords) {
        JobService.getData(coords.latitude, coords.longitude, searchTerm).then(function onSuccess(data) {
            $scope.joblist = data;
            $scope.jobOrder = 'title';
            $('.pre-load').remove();
        }, function onError(response) {
            $scope.error = "failed to get data";        
        });

        JobService.getCity(coords.latitude, coords.longitude).then(function(city) {
            $scope.city = city;
        }, function(response) {
            console.log(response);
        });
    });
}]);

joblistControllers.controller('DetailsController',['$scope', '$routeParams', 'JobService', function($scope, $routeParams, JobService) {

    $scope.pageClass = 'page-details';

    $scope.$on('$routeChangeSuccess', function(e, currentRoute, previousRoute) {
        window.scrollTo(0, 0);
    });

    JobService.getDetails($routeParams.itemId).then(function(data) {
        var job = data;
        $scope.job = job;
    }, function(reason) {
        $scope.error = "failed to get data";        
    });

    branch.init("key_live_nmllYe7xNU5DUy340KNxMenagcpeaP95", function(err, data) {
        console.log(data);
        console.log(err);
    });

    $scope.applyNow = function() {
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
            //$scope.quickApplyLink = link;
            window.location.replace(link);
        });      
    };
}]);

joblistControllers.controller('SearchController', ['$scope', 'JobService', function($scope, JobService) {

    $scope.pageClass = 'page-search';

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
