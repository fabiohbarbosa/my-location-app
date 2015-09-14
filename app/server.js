/**
 * Created by fabio on 13/09/15.
 */
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);

// server
var httpPort = 3000;
http.listen(httpPort);

// json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongo
app.mongoose = require('./lib/db_connection')();

var Type = ['invalid_ip', 'api_error'];
app.Type = Type;

var load = require('express-load');
load('models', {cwd: 'app'})
    .then('controllers', {cwd: 'app'})
    .then('routes', {cwd: 'app'})
    .then('websocket', {cwd: 'app'})
    .into(app);

// router
var router = express.Router();
app.use(router);

// error handler
var errorHandler = require('./lib/exception_handler')();
app.use(errorHandler.exceptionHandler);

console.log('# Server running on port ' + httpPort);