angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state, $http, $q) {
  console.log('DashCtrl');

  $scope.init = function(){
    $scope.getImages()
    .then(function(res){
      console.log('Images: ', res)
      $scope.imageList = res.data;
    }, function(status){
      $scope.pageError = status;
      console.log('Error: ', status)
    })
  }

  $scope.getImages = function(){
   //using promise
    var defer = $q.defer();

    $http.jsonp('https://api.dribbble.com/v1/shots?access_token=2559af16cdf2f40341061c80a3554211c86f6fe8568ab04b55c0126beb8e1a3c&callback=JSON_CALLBACK')
    .success(function(res){
      defer.resolve(res)
    })
    .error(function(status, err){
      defer.reject(status)
    })
    return defer.promise;
  }
  $scope.init();
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
