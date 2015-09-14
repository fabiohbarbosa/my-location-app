module.exports = function (app) {
    var requestIp = require('request-ip');
    var HttpStatus = require('http-status-codes');
    var Type = require('../const/type')();
    var Client = require('node-rest-client').Client;
    var client = new Client();

    var Access = app.models.access;
    var NoAccess = app.models.noAccess;

    /**
     * Converter ipinfo result in object and set credits
     * @param data
     */
    function ipIntoToObject(data) {
        var ipInfo = JSON.parse(data.toString());
        ipInfo.credits = 'http://ipinfo.io/';
        return ipInfo;
    }

    function saveAccess(data, next, res) {
        var access = new Access(ipIntoToObject(data));
        access.save(function (err, data) {
            if (err) {
                next(err);
            }
            res.json(data);
        });
    }

    function saveNoAccess(info, type, next, res) {
        var noAccess = new NoAccess();
        noAccess.info = info;
        noAccess.type = type;
        noAccess.save(function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.json(data);
        });
    }

    return {
        get: function (req, res, next) {
            var splitAddress = requestIp.getClientIp(req).split('::ffff:');

            // No Access
            var ipAddress;
            if (splitAddress.length === 1) {
                var info = 'Not discovery IP address for '+splitAddress[0];
                saveNoAccess(info, Type.INVALID_IP, next, res);
                return;
            }

            // Connect to ipinfo
            ipAddress = splitAddress[1];
            client.get('http://ipinfo.io/'+ipAddress+'/json', function(data, results) {
                try {
                    if (results.statusCode === HttpStatus.OK) {
                        saveAccess(data, next, res);
                    } else {
                        saveNoAccess(info, Type.ERROR_API, next, res);
                    }
                } catch (err) {
                    next(err);
                }
            });
        }
    };
};