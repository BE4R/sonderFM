var app = angular.module('sonder', ['ngAnimate', 'ui.bootstrap', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('/home', {
      url: "/",
      controller: 'mainCtrl',
      views: {
        "list": {
          templateUrl: 'templates/list.html'
        },
        "favorites": {
          templateUrl: 'templates/favorites.html'
        },
        "footer": {
          templateUrl: 'templates/footer.html'
        }
      }
    })

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
});

app.controller('mainCtrl', function ($scope, soundcloud, $sce) {

  $scope.userId = '';
  $scope.username = '';
  $scope.profiles = soundcloud.followings;
  $scope.isLoading = soundcloud.isLoading;
  $scope.errorMsg = '';
  $scope.favoritesErrMsg = '';
  $scope.favorites = soundcloud.favorites;

  $scope.selectedFollowingUser;
  $scope.selectFollowingUser = function (index) {
    $scope.selectedFollowingUser = index;
  }

  $scope.selectedSong;
  $scope.selectSong = function (index) {
    $scope.selectedSong = index;
  }

  $scope.searchUser = function () {
    $scope.userId = '';
    $scope.errorMsg = '';

    soundcloud.getId($scope.formData.username)
      .then(function (data) {
          $scope.userId = data;

          soundcloud.getFollowing($scope.userId)
            .then(function (data) {
                $scope.profiles = data;
              },
              function (err) {
                $scope.errorMsg = err;
              })
        },
        function (err) {
          $scope.errorMsg = err;
        })
  };

  $scope.userFavorites = function (id) {
    $scope.errorMsg = '';
    $scope.favorites = '';
    $scope.favoritesErrMsg = ''

    soundcloud.getUser(id).then(function (data) {
      $scope.username = data;
    }, function (err) {
      $scope.errorMsg = err;
    });

    soundcloud.getFavorites(id).then(function (data) {
      if (data.length > 0) {
        $scope.favorites = data;
      } else {
        $scope.favoritesErrMsg = "This user has no favorite tracks."
      }
    }, function (err) {
      $scope.errorMsg = err;
    })
  };

  $scope.playTrack = function (url) {
    SC.oEmbed(url, {
      auto_play: true,
      maxwidth: 360,
      maxheight: 105
    }, function (data) {
      console.log(data);
      $scope.$apply($scope.player_html = $sce.trustAsHtml(data.html));
    })
  }

});
