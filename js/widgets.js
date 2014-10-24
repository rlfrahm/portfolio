angular.module('widgets', [])

.directive('wWeather', ['$http',
  function($http) {
    return {
      restrict: 'E',
      scope: {},
      controller: function($scope) {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getWeather);
        }

        function getWeather(position) {
          $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude)
          .success(function(response) {
            console.log(response);
            $scope.loaded = true;
            $scope.data = response;
          });
        }
      },
      templateUrl: './partials/widgets/weather.html'
    }
  }
]);