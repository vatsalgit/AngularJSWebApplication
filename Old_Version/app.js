var app = angular.module('app',['ngRoute','ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Details', {
  templateUrl: 'details.html',
  controller: 'DetailsCtrl'
      })
      
}]);

app.controller('DetailsCtrl', function($scope) {

  $scope.message = 'This is Show orders screen';

});

app.controller('TabController', function () {
        this.tab = 'user';

        this.setTab = function (tabId) {
            this.tab = tabId;
            // sharedProperties.setTab(tabId);
        };

        this.isSet = function (tabId) {
            return this.tab === tabId;
        };

    });

app.controller('myCtrl',function($scope,$http,$location)
{     

       
      $scope.detTab=0;
      $scope.getDetails = function(id)
      {

        $http({
              
              method: 'GET',
              url: 'main.php',
              params : {details : id},

          }).then(function (details) {
              
              // on success
              $scope.details = details;
              
          }, function (details) {
              
              // on error
              console.log(details.data,details.status);
            

          });
          $location.url('Details');
          $scope.detTab=1;
      }
      $scope.goBack = function()
      {
         $scope.detTab=0;
         $location.url('/');
      }
      $scope.search = function() {
          // sharedProperties.setQuery($scope.query);   
          $scope.type = 'user';
           
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

          $scope.type = 'page';
           
          $http({
              
              method: 'GET',
              url: 'main.php',
              params : {query : $scope.query, type : $scope.type},

          }).then(function (results) {
              
              // on success
              $scope.results_page = results;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
            

          });

          $scope.type = 'event';
           
          $http({
              
              method: 'GET',
              url: 'main.php',
              params : {query : $scope.query, type : $scope.type},

          }).then(function (results) {
              
              // on success
              $scope.results_event = results;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
            

          });

          $scope.type = 'place';
           
          $http({
              
              method: 'GET',
              url: 'main.php',
              params : {query : $scope.query, type : $scope.type},

          }).then(function (results) {
              
              // on success
              $scope.results_place = results;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
            

          });

          $scope.type = 'group';
           
          $http({
              
              method: 'GET',
              url: 'main.php',
              params : {query : $scope.query, type : $scope.type},

          }).then(function (results) {
              
              // on success
              $scope.results_group = results;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
            

          });





    };

});
 

 

