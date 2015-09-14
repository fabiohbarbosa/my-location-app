module.exports = function (app) {
    var requestIp = require('request-ip');

    return {
        get: function (req, res, next) {
            var clientIp = requestIp.getClientIp(req);

            var slipIp = clientIp.split('::ffff:');
            if (slipIp[1]) {
                res.json({ ip_address: clientIp });
            } else {
                res.json({ err_message: 'IP não encontrado' });
            }
        }
    };
};