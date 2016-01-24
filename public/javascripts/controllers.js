/*controller -routing*/
var joblistControllers = angular.module('joblistControllers',[]);

joblistControllers.controller('ListController', ['$scope', 'JobService', 'LocationService', function($scope, JobService, LocationService){

    $scope.pageClass = 'page-list';

    var coordinates = LocationService.getCoordinates().then(function(coords) {
        JobService.getData(coords.latitude, coords.longitude, '').then(function onSuccess(data) {
            $scope.joblist = data;
            $scope.jobOrder = 'title';
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
    }

    JobService.getDetails().then(function(data) {
        var job = data[$routeParams.itemId];
        $scope.job = job;
    }, function(reason) {
        $scope.error = "failed to get data";        
    });
}]);

joblistControllers.controller('SearchController', ['$scope', 'JobService', function($scope, JobService) {

    $scope.pageClass = 'page-search';

    $scope.$on('$routeChangeSuccess', function(e, currentRoute, previousRoute) {
        window.scrollTo(0, 0);
    });

    $scope.categories = [
        {
            name: "partials.search.Food",
            term: "food"
        },
        {
            name: "partials.search.CoffeeShops",
            term: "coffee+shops"
        },
        {
            name: "partials.search.Bartender",
            term: "bartender"
        },
        {
            name: "partials.search.Nightlife",
            term: "nightlife"
        },
        {
            name: "partials.search.Cashier",
            term: "cashier"
        },
        {
            name: "partials.search.Hospitality",
            term: "hospitality"
        },
        {
            name: "partials.search.CustomerSupport",
            term: "customer+support"
        },
        {
            name: "partials.search.Business",
            term: "business"
        },
        {
            name: "partials.search.Merchandising",
            term: "merchandising"
        }
    ];

    $scope.search = function(searchTerm) {
        console.log(searchTerm);
        JobService.getData(43.6419, -79.3746, searchTerm).then(function(data) {
            console.log(data);
        });
    }
}]);

joblistControllers.controller('ModalMessageController', ['$scope', '$routeParams', '$uibModal', '$log', function($scope, $routeParams, $uibModal, $log) {

    //should could from routeParams
    var finalMsg = 'You look twice in the mirror before you head out because standing out is your form of expression. Shopping to you is a serious sport; you take those sales seriously. You love to help people, and you\'re not afraid to voice your opinions. Retail jobs are perfect for you - not only because of the employee discount you get to enjoy, but it\'s a job where your individuality is appreciated.';
    $scope.items = [finalMsg];
    //angular.element('#myModalShower').trigger('click');
    //$scope.open = $dialog.dialog({}).open('myModalContent.html');
    $scope.open = function(size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceMessageController',
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.open();
}]);

joblistControllers.controller('CategoriesController',['$scope', '$routeParams', '$uibModal', '$log', function($scope, $routeParams, $uibModal, $log) {

    $scope.items = ['Food' ,'Coffee Shops', 'Bartender', 'Nightlife', 'Cashier', 'Hospitality', 'Server', 'Customer Support', 'Business', 'Merchandising'];

    $scope.openCategory = function(size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myCategoryContent.html',
            controller: 'ModalInstanceMessageController',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

joblistControllers.controller('LocationsController',['$scope', '$routeParams', '$uibModal', '$log', function ($scope, $routeParams, $uibModal, $log) {

    $scope.items = ['Toronto', 'Mississauga'];

    $scope.openLocation = function(size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myLocationContent.html',
            controller: 'ModalInstanceMessageController',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

joblistControllers.controller('ModalInstanceMessageController', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

joblistControllers.controller('ModalMsgController',['$scope', '$routeParams', '$uibModal', '$log', function ($scope, $routeParams, $uibModal, $log) {

    var finalMsg = 'You look twice in the mirror before you head out because standing out is your form of expression. Shopping to you is a serious sport; you take those sales seriously. You love to help people, and you\'re not afraid to voice your opinions. Retail jobs are perfect for you - not only because of the employee discount you get to enjoy, but it\'s a job where your individuality is appreciated.';
    $scope.open = function() {
        $scope.showModal = true;
    };

    $scope.ok = function() {
        $scope.showModal = false;
    };

    $scope.cancel = function() {
        $scope.showModal = false;
    };

    $scope.message = finalMsg;

}]);

