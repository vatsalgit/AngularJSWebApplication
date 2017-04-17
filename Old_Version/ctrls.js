//Define an angular module for our app
var sampleApp = angular.module('sampleApp', ['ngAnimate','ngRoute']);

//Define Routing for app
//Uri /AddNewOrder -> template AddOrder.html and Controller AddOrderController
//Uri /ShowOrders -> template ShowOrders.html and Controller AddOrderController
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/AddNewOrder', {
	templateUrl: 'add_order.html',
	controller: 'AddOrderController'
      }).
      when('/ShowOrders', {
	templateUrl: 'show_orders.html',
	controller: 'ShowOrdersController'
      })
}]);

sampleApp.controller('mainCtrl',function($scope,$location)
{
	$scope.val = 1;
	$scope.toggleFav = function()
	{
		if($scope.val==1)
		$scope.val=0;
		else
		$scope.val=1;
	}
});

