module.exports = function(app) {
    var ENDPOINT = '/api/ip_address/';
    var ip = app.controllers.ip;
    app.get(ENDPOINT, ip.get);
};