/*controller -routing*/
var joblistControllers = angular.module('joblistControllers',[]);
console.log("Controller");

joblistControllers.controller('ListController', ['$scope', '$http', '$geolocation', 'JobService', function($scope, $http, $geolocation, JobService){

    $geolocation.getCurrentPosition({
        timeout: 60000
    }).then(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        JobService.getData(latitude, longitude).then(function onSuccess(data) {
            $scope.joblist = data;
            $scope.jobOrder = 'title';
        }, function onError(response) {
            $scope.error = "failed to get data";		
        })
    });
}]);

joblistControllers.controller('DetailsController',['$scope', '$http', '$routeParams', 'JobService', function($scope, $http, $routeParams, JobService) {
	// $http.get('/getData').then(onJobDetailComplete, onError);

    JobService.getDetails().then(function(data) {
		$scope.joblist = data;
		$scope.whichItem = $routeParams.itemId;
		if ($routeParams.itemId > 0) {
			$scope.prevItem = Number($routeParams.itemId)-1;
		}
		else {
			$scope.prevItem = $scope.joblist.length-1;
		}

		if ($routeParams.itemId < $scope.joblist.length - 1) {
			$scope.nextItem = Number($routeParams.itemId) + 1;
		}
		else {
			$scope.nextItem = 0;
		}		
	}, function(reason) {
		$scope.error = "failed to get data";		
    });
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
/*
	full app variable 
	hold modules,[] hold dependencies for this application
	myApp is going to have all the code for application..same as namespacing--it is way to protect code so that no other script is going to interfere with our app
	myApp is unique to project

var myApp = angular.module('myApp',[]);
//scope is a variable that can be used to pass things from javascript to your application and template 
myApp.controller('MyController',['$scope','$http',function($scope, $http){
	$http.get('js/data.json').success(function(data){
		$scope.joblist = data;
		$scope.jobOrder = 'role';
	});
}])*/

	/* test hard code data
	$scope.message = {
		'name': 'Jas',
		'title':'Dev',
		'company': '3pt'
	};
	
	$scope.joblist = 
		[
			{
				'category':'Restaurant',
				'role':'Sales Associate',
				'company':'RUDSAK Queen Street',
				'details':'It is excellent place to work'
			},
			{
				"category":"Restaurant",
				"role":"Assistant Manager",
				"company":"RUDSAK Queen Street",
				"details":"Work, grow  and earn"
			},
			{
				"category":"Restaurant",
				"role":"Food Artist",
				"company":"Crave Healthy Habits",
				"details":"Place to feed healthy"
			}
		]
	;*/

//controllers.js
//list.html
