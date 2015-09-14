module.exports = function (app) {
    var requestIp = require('request-ip');

    return {
        get: function (req, res, next) {
            var clientIp = requestIp.getClientIp(req);
            var ipAddress = {
                ip_address: clientIp
            };

            res.json(ipAddress);
        }
    };
};