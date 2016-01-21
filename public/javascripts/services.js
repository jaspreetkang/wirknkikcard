var jobServices = angular.module('jobServices', []);

jobServices.service('JobService', ['$q', '$http', '$cacheFactory', function($q, $http, $cacheFactory) {
    this.cache = $cacheFactory('jobData');
    var self = this;

    return {
        getData: function(lat, lon, searchTerm) {
            var defer = $q.defer();
            lat = lat.toFixed(3);
            lon = lon.toFixed(3);
            searchTerm = '';
            if (lat == self.latitude && lon == self.longitude && searchTerm == self.searchTerm) {
                defer.resolve(self.cache.get('jobs'));
                return defer.promise;
            }
            self.latitude = lat || '';
            self.longitude = lon || '';
            self.searchTerm = searchTerm || '';
            $http.get('/getData?lat=' + self.latitude + '&lon=' + self.longitude)
            .then(function(response) {
                self.cache.put('jobs', response.data);
                defer.resolve(response.data);
            }, function(response) {
                console.log(response);
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
