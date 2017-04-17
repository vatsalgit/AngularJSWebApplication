// Code goes here

angular.module("myApp" , [])

.controller("myController", function($scope) {
  
  $scope.myCollection = [
      { name: 'John', age: 25 },
      { name: 'Barry', age: 43 },
      { name: 'Kim', age: 26 },
      { name: 'Susan', age: 51 },
      { name: 'Fritz', age: 19 }
    ];
    
  $scope.toggleBold = function(repeatScope) {
      if (repeatScope.isBold) {
        repeatScope.isBold = false;
      } else {
        repeatScope.isBold = true;
      }
  };
});