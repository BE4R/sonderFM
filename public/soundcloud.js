app.service('soundcloud', function ($q) {

  var client_id = "e2df2ed06af9f855896950f3ff6dacfd"

  SC.initialize({
    client_id: client_id
  });

  var self = {
    'id': '',
    'username': '',
    'followings': [],
    'errorMsg': '',
    'favorites': [],
    'getUser': function (id) {
      var d = $q.defer();
      SC.get('/users/' + id, function (data) {
        if (!data.errors) {
          angular.copy(data.username, self.username);
          d.resolve(data.username);
        } else {
          d.reject('cant find user');
        }
      });
      return d.promise;
    },
    'getId': function (username) {
      var d = $q.defer();
      SC.get('/resolve?url=http://soundcloud.com/' + username, function (data) {
        if (!data.errors) {
          angular.copy(data.id, self.id);
          d.resolve(data.id);
        } else {
          d.reject('cant find user');
        }
      });
      return d.promise;
    },
    'getFollowing': function (id) {
      var d = $q.defer();
      SC.get('/users/' + id + '/followings', function (data) {
        if (data.collection.length > 0) {
          angular.copy(data.collection, self.followings);
          d.resolve(data.collection);
        } else {
          d.reject('Nothing found for this user.');
        }
      });
      return d.promise;
    },
    'getFavorites': function (id) {
      var d = $q.defer();
      SC.get('/users/' + id + '/favorites', function (data) {
        if (data.length > 0) {
          angular.copy(data, self.favorites);
          d.resolve(data);
        } else {
          angular.copy('No favorite Tracks', self.errorMsg);
          d.reject('This user has no favorite tracks.');
        }
      });
      return d.promise;
    }
  }

  return self;

});