
/*controller -routing*/
var joblistControllers = angular.module('joblistControllers',[]);
console.log("Controller");

//joblistControllers.controller('ListController',['$scope','$http','$location','$anchorScroll',function($scope, $http,$location,$anchorScroll){
joblistControllers.controller('ListController',['$scope','$http','$geolocation', function($scope, $http, $geolocation){
	onJobListComplete = function(response){
		$scope.joblist = response.data;
		$scope.jobOrder = 'title';
	};
	OnError = function(reason){
		$scope.error = "failed to get data";		
	};

    $geolocation.getCurrentPosition({
        timeout: 60000
    }).then(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        $http.get('/getData?lat=' + latitude + '&lon=' + longitude).//,{cache:true}).
            then(onJobListComplete,OnError);
    });



	//scrolling issue
	/*if($scope.whichItem){
		console.log($scope.whichItem);
		$location.hash("item_"+ $scope.whichItem);
		$anchorScroll();
	}
	else{
		console.log('index is empty');
		$anchorScroll();
	}*/

	/*
	success(function(data){
		console.log("Found");
		$scope.joblist = data;
		$scope.jobOrder = 'role';
	}).
	error(function (data,a,b) {
    console.log(a);
    console.log(b());
  });*/
}]);

joblistControllers.controller('DetailsController',['$scope','$http','$routeParams',function($scope, $http,$routeParams){
	$http.get('/getData').success(function(data){
		$scope.joblist = data;
		$scope.whichItem = $routeParams.itemId;
		if($routeParams.itemId > 0){
			$scope.prevItem = Number($routeParams.itemId)-1;
		}
		else{
			$scope.prevItem = $scope.joblist.length-1;
		}

		if($routeParams.itemId < $scope.joblist.length-1){
			$scope.nextItem = Number($routeParams.itemId)+1;
		}
		else{
			$scope.nextItem = 0;
		}		
	});
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