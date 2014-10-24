angular.module('App', ['ngRoute'])

.controller('IndexController', ['$scope', 
  function($scope) {

  }
])

.controller('ChartController', ['$scope', 
  function($scope) {
    $scope.data = [{
      "id": 1,
      "startTime": "Oct 7, 2014",
      "endTime": "Oct 9, 2014",
      "duration": "02d 16h 05m",
      "category": "X Cat",
      "series": 1,
      "extras": {
        "Flight": "LH2309"
      }
    }, {
      "id": 2,
      "startTime": "Oct 7, 2014",
      "endTime": "Oct 9, 2014",
      "duration": "02d 16h 05m",
      "category": "X Cat",
      "series": 1,
      "extras": {
        "Flight": "AA2401"
      }
    }, {
      "id": 3,
      "startTime": "Oct 7, 2014",
      "endTime": "Oct 9, 2014",
      "duration": "02d 16h 05m",
      "category": "X Cat",
      "series": 1,
      "extras": {
        "Flight": "AA2401"
      }
    }];

    var barHeight  = 20;
    var barSpacing = 4;
    var barRound   = 3;
    var textHeight = 16;

    var dataArea = d3.select("svg").append("g").attr("class", "data");
    var actualRange = [];
    function updateView(data) {
      dataArea.append("g")
        .attr("class", "layer")
        .attr("x", 0)
        .attr("y", function(d) {
            var y = 0;
            if (this.previousSibling) {
                var h = _(_(this.previousSibling.children).map(function(c) {
                    return parseFloat(c.getAttribute("y"))+parseFloat(c.getAttribute("height"));
                }).concat([parseFloat(this.previousSibling.getAttribute("y"))+barHeight+barSpacing])).max();
                y += h + barSpacing*2;
            }

            actualRange.push(y);
            return y;
        })
        .selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar-group")
        .append("rect")
        .attr("class", "bar")
        .attr("data-time", function(d) { return d.id.time; })
        .attr("data-span", function(d) { return d.id.span; })
        .attr("data-field", function(d) { return d.id.field; })
        .attr("rx", barRound)
        .attr("ry", barRound)
        .attr("x", 0)
        .attr("width", 100)
        .attr("height", barHeight)
        .attr("y", function(d, i) { return i * 24;})
        .attr("fill", function(d) { return "#2a6496"; });

      d3.selectAll(".bar-group")
        .append('text')
        .attr('x', 0)
        .attr('y', function(d, i) { console.log(d3.select(this.parentNode.children[0]).attr("y"));return parseFloat(d3.select(this.parentNode.children[0]).attr("y")) + 16;})
        .attr('fill', 'black')
        .attr('text-anchor', 'start')
        .attr('font-size', textHeight)
        .text(function(d) { return d.extras['Flight']; });
    }
    updateView($scope.data);
  }
])

.directive('appMe', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './partials/sidebar/user-info.html' 
    };
  }
])

.directive('appClock', ['$interval',
  function($interval) {
    return {
      restrict: 'E',
      scope: {},
      controller: function($scope) {
        
        $interval(function() {
          var d = new Date();
          $scope.hour = d.getHours();
          $scope.minute = d.getMinutes();
          $scope.second = d.getSeconds();
        }, 1000);
      },
      templateUrl: './partials/clock.html'
    };
  }
])

.directive('appWeather', ['$http',
  function($http) {
    return {
      restrict: 'E',
      scope: {},
      controller: function($scope) {
        $http.get('http://api.openweathermap.org/data/2.5/weather?q=Ames,ia')
        .success(function(response) {
          console.log(response);
        });
      }
    }
  }
])

.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
      controller: 'IndexController'
    })
    .when('/d3chart', {
      templateUrl: 'partials/d3-chart.html',
      controller: 'ChartController'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);