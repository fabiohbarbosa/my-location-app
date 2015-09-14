/**
 * Created by fabio on 13/09/15.
 */
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);

var httpPort = 3000;
http.listen(httpPort);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var load = require('express-load');
load('models', {cwd: 'app'})
    .then('controllers', {cwd: 'app'})
    .then('routes', {cwd: 'app'})
    .then('websocket', {cwd: 'app'})
    .into(app);

// router
var router = express.Router();
app.use(router);

console.log('# Server running on port ' + httpPort);