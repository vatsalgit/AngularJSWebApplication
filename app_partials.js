// var jq = $.noConflict();

var app = angular.module('app',['ngRoute','ngAnimate','ui.bootstrap']);

app.animation('.slide', function() {
  var NG_HIDE_CLASS = 'ng-hide';
  return {
    beforeAddClass: function(element, className, done) {
      if(className === NG_HIDE_CLASS) {
        element.slideUp(done);
      }
    },
    removeClass: function(element, className, done) {
      if(className === NG_HIDE_CLASS) {
        element.hide().slideDown(done);
      }
    }
  }
});



app.service('sharedProperties', function () {
        var currentTab = 'user';

        return {
            getTab: function () {
                return currentTab;
            },
            setCurrTab: function(value) {
                currentTab = value;
            }
        };
    });

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Details', {
  templateUrl: 'partials/details.html',
  controller : 'DetailsCtrl'
      })
      .when('/user', {
  templateUrl: 'partials/partial_user.html'
      })
      .when('/page', {
  templateUrl: 'partials/partial_page.html'
      })
       .when('/event', {
  templateUrl: 'partials/partial_event.html'
      })
        .when('/place', {
  templateUrl: 'partials/partial_place.html'
      })
      .when('/group', {
  templateUrl: 'partials/partial_group.html'
      })
      .when('/favorite', {
  templateUrl: 'partials/partial_fav.html',
  controller : 'favController'
      })

      
}]);

app.controller('DetailsCtrl',function($scope)
{
  $scope.pageClass = 'details-page';

  $scope.zalbums = {};
  $scope.first = {};

   $scope.toggleAlbums = function(name){
     console.log('toggle');
    if($scope.zalbums.shown === name){
      $scope.zalbums.shown = null;
    } else {
      $scope.zalbums.shown = name;
    }
     
 }
 
  
 $scope.update=function(index)
 {
    if (index==0)
      $scope.first.data=true;
    else
      $scope.first.data=false;

    // return $scope.first.data;
 }

});

app.controller('favController', function($scope) {

  $scope.favorites = {};

  $scope.removeFav = function(key)
  {
      localStorage.removeItem(key);
      delete $scope.favorites[key];
  }

  for (var i = 0; i < localStorage.length; i++)
  {
    $scope.favorites[localStorage.key(i)]=JSON.parse(localStorage.getItem(localStorage.key(i))) ;
  }

});

app.controller('TabController', function ($location,$scope,sharedProperties) {
        this.tab = 'user';

        this.setTab = function (tabId) {
            this.tab = tabId;
            $location.url('/'+tabId);
            $scope.slide = 'normal';
            sharedProperties.setCurrTab(tabId);
        };

        this.isSet = function (tabId) {
            return this.tab === tabId;
        };

    });

app.controller('myCtrl',function($scope,$http,$location,sharedProperties,$timeout)
{   

      $scope.done=false;
      $scope.data = { progress : 0 };    
      (function progress(){
        if($scope.data.progress < 100)
        {
            $timeout(function(){
                $scope.data.progress += 1;
                progress();
            },200);
        }
        else
          $scope.done=true;
    })();
     
      // $scope.slide =  'normal';
      // $scope.detTab=0;
      var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

          function success(pos) {
            var crd = pos.coords;
            $scope.latitude = crd.latitude;
            $scope.longitude =  crd.longitude;
          };
           
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          };


      navigator.geolocation.getCurrentPosition(success, error, options);

      
      $scope.TimeSplit = function(string) 
      {
      var array = string.split('+');
      return array[0];
      } 

      $scope.DateTimeSplit = function(string, nb) 
      {
      var array = string.split('T');
      return array[nb];
      } 

     $scope.postBtn = function(picture,name) {
        FB.ui({
        method: 'feed',
        link: window.location.href,
        caption: 'FB SEARCH FROM CSCI',
        name : name,
        picture: picture
      }, function(response){
        if(response)
          alert("Posted Succesfully");
        else
          alert("Not Posted");  
      });
    }
      
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
          // $scope.detTab=1;
          // $scope.slide =  'view-animate';
      }

      $scope.goBack = function()
      {
         $scope.detTab=0;
         $location.url('/'+sharedProperties.getTab());
      }


      $scope.toggleFav = function(id,picture,name,repeatScope)
      {
               
        var value = localStorage.getItem(id+'');
        if(value==null)
        {
          localStorage.setItem(id+'',JSON.stringify({"name":name,"type":sharedProperties.getTab(),"image":picture,"id":id}));
        }
        else
        localStorage.removeItem(id+'');


        if (repeatScope.isFav) {
          repeatScope.isFav = false;
        } else {
          repeatScope.isFav = true;
        }

      }

      $scope.isAlreadyFav = function(id)
      {
          var value = localStorage.getItem(id+'');
          
          if(value==null)
            return false;
          else
            return true;

          alert(value);
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
              // $scope.data.progress += 15;
              
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
              // $scope.data.progress += 20;
              
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
              // $scope.data.progress += 20;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
            

          });
          
          

          $scope.type = 'place';      
           
          $http({
              
              method: 'GET',
              url: 'main.php',
              params : {query : $scope.query, type : $scope.type, center: $scope.latitude+','+$scope.longitude },

          }).then(function (results) {
              
              // on success
              $scope.results_place = results;
              // $scope.data.progress += 20;
              
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
              // $scope.data.progress += 20;
              // $scope.done=true;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
            

          });

          
          $location.url('/'+sharedProperties.getTab());



    };

    $scope.getNext= function(nexturl)
    {

       $http({
              
              method: 'GET',
              url: nexturl,
        

          }).then(function (results) {
              
              // on success
              if(sharedProperties.getTab()=='user')
              $scope.results = results;
              else if (sharedProperties.getTab()=='page')
              $scope.results_page = results;
              else if (sharedProperties.getTab()=='place')
              $scope.results_place = results;
              else if (sharedProperties.getTab()=='event')
              $scope.results_event = results;
              else
              $scope.results_group = results;  
              // $scope.data.progress += 15;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
            

          });
         
    };

     $scope.getPrev= function(prevurl)
    {

       $http({
              
              method: 'GET',
              url: prevurl,
        

          }).then(function (results) {
              
              // on success
              if(sharedProperties.getTab()=='user')
              $scope.results = results;
              else if (sharedProperties.getTab()=='page')
              $scope.results_page = results;
              else if (sharedProperties.getTab()=='place')
              $scope.results_place = results;
              else if (sharedProperties.getTab()=='event')
              $scope.results_event = results;
              else
              $scope.results_group = results;  
              // $scope.data.progress += 15;
              
          }, function (results) {
              
              // on error
              console.log(results.data,results.status);
            

          });
         
    }

});
 

 

