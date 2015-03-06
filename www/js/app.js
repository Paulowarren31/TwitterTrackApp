var app=angular.module('app', ['ionic','uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'views/home.html'
    })
    ;

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/');


});



app.controller('mainCtrl',function($scope,$http){

  $scope.photo="http://i.ytimg.com/vi/Ck-YE-ArslI/default.jpg"
  $scope.loadHandle=function(handle){
    var lastHandle=handle
    $http.get('http://twitter-track-43784.onmodulus.net/api/search/'+handle).
      success(function(data){
        $scope.tweets=data;
        $scope.photo=data[0].user.profile_image_url;
        $scope.photo=$scope.photo.replace('_normal','')
        $scope.handle=data[0].user.screen_name;
        $scope.location=data[0].place.full_name;
        $scope.map.center.latitude=data[0].geo.coordinates[0]
        $scope.map.center.longitude=data[0].geo.coordinates[1]
      })
  }


  $scope.map={
    center:{
      latitude: 42.2552670,
     longitude: -83.7548280
    },
    zoom: 15,
    options:{
      scaleControl: false,
      rotateControl: false,
      panControl: false,
      overviewMapControl: false,
      scrollwheel: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      zoom: 10
    }
    }

  $scope.changeHandle=function(handle){
    trackService.loadTracks(handle);
    console.log($scope.tweets[0].user.profile_image_url)
    $scope.photo=$scope.tweets[0].user.profile_image_url;
    $scope.photo=$scope.photo.replace('_normal','')
    console.log($scope.photo)
  }



})
