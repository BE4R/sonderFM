var SC = require('node-soundcloud');
var https = require('https');
var request = require('request');

module.exports = function (app) {

  SC.init({
    id: process.env.client_id,
    secret: process.env.secret
  });

  app.get('/username/:id', function (req, res) {

    SC.get('/users/' + req.params.id, function (err, data) {
      if (err) {
        res.json({
          error: err[0].error_message
        });
      } else {
        res.json({
          username: data.permalink
        });
      }
    });

  });

  app.get('/id/:username', function (req, res) {

    SC.get('/resolve?url=https://soundcloud.com/' + req.params.username, function (err, data) {
      if (err) {
        console.log(err);
        res.json({
          error: err
        });
      } else {
        request(data.location, function (error, response, body) {
          res.send(response.body);
        });
      }
    });

  });

  app.get('/following/:id', function (req, res) {

    SC.get('/users/' + req.params.id + '/followings', function (err, data) {
      if (err) {
        console.log(err);
        res.json({
          error: err
        });
      } else {
        res.send(data);
      }
    })

  })

  app.get('/favorites/:id', function (req, res) {

    SC.get('/users/' + req.params.id + '/favorites', function (err, data) {
      if (err) {
        console.log(err);
        res.json({
          error: err[0].error_message
        });
      } else {
        res.send(data);
      }
    });

  })

};
