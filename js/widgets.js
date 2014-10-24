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
])

.directive('wGithubFeed', ['$http',
  function($http) {
    return {
      restrict: 'E',
      scope: {},
      controller: function($scope) {
        $http.get('https://api.github.com/users/rlfrahm/events/public').success(function(response) {
          console.log(response);
          $scope.loaded = true;
          $scope.items = response;
          $scope.feed = response.slice(0,4);
        });

        $scope.GetEventVerbage = function(type) {
          switch (type) {
            case 'PushEvent':
              return 'pushed to';
              break;
            case 'CreateEvent':
              return 'created';
              break;
            case 'DeleteEvent':
              return 'deleted';
              break;
            default:
              return 'did something to';
              break;
          }
        };
      },
      templateUrl: './partials/widgets/github-feed.html'
    }
  }
]);