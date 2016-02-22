app.service('soundcloud', function ($q, $http) {

  var self = {
    'id': '',
    'username': '',
    'followings': [],
    'errorMsg': '',
    'favorites': [],
    'getUser': function (id) {
      var d = $q.defer();
      $http.get('/username/' + id).success(function (data) {
        d.resolve(data.username);
      }).error(function (error) {
        d.resolve(error);
      })
      return d.promise;
    },
    'getId': function (username) {
      var d = $q.defer();
      $http.get('/id/' + username).success(function (data) {
        if (data.error) {
          d.reject("Cannot find specified username.");
        } else {
          console.log(data.id);
          d.resolve(data.id);
        }
      })
      return d.promise;
    },
    'getFollowing': function (id) {
      var d = $q.defer();
      $http.get('/following/' + id).success(function (data) {
        console.log(data.collection);
        d.resolve(data.collection);
      }).error(function (error) {
        d.reject("Somethings wrong");
      })
      return d.promise;
    },
    'getFavorites': function (id) {
      var d = $q.defer();
      $http.get('/favorites/' + id).success(function (data) {
        d.resolve(data);
      }).error(function (error) {
        d.reject(error);
      })
      return d.promise;
    }
  }

  return self;

});
