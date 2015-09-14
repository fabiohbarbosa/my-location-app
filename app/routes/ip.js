module.exports = function(app) {
    var ENDPOINT = '/api/ip/';
    var ip = app.controllers.ip;
    app.get(ENDPOINT, ip.get);
};