var app = angular.module('app', [])
 
app.controller('TabController', function ($scope,$http) {
        $scope.tab = 1;

        $scope.setTab = function (tabId) {
            $scope.tab = tabId;
            // rootScope = tabId;
        };

        $scope.isSet = function (tabId) {
            return $scope.tab === tabId;
        };


         $scope.search = function() {
          $http({
              
              method: 'GET',
              url: 'main.php',
              params : {query : $scope.query, type : $scope.type},

          }).then(function (results) {
              
              // on success
              $scope.results = results;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
              
          });
    };



    });



