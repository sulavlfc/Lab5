/**
 * Created by Sulav on 7/11/2017.
 */
angular.module('weatherApp', ['ngMap']).config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).controller('weatherCtrl', function(NgMap, $scope,$http) {


    $scope.changeCenter = function() {

        $scope.place = this.getPlace();
     
      console.log($scope.place.geometry.location.lat());
        $scope.map.setCenter($scope.place.geometry.location);
        var url = "http://api.wunderground.com/api/00df0c289bda2a85/conditions/q/"+$scope.place.geometry.location.lat()+","+$scope.place.geometry.location.lng()+".json";
        console.log(url)
        var weatherURL = $http.get(url);

        weatherURL.success(function (data) {
            console.log(data)
            console.log(data.current_observation.temperature_string)
            $scope.temperature = data.current_observation.temperature_string;
        });


    };
    
});