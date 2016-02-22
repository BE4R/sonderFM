//------DEPENDENCIES-----//
var express = require('express');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

//logging and parsing
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

//ROUTES
require('./app/routes.js')(app)

//LISTEN
app.listen(port);
console.log('App listening on port ' + port);
