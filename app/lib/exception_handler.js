module.exports = function () {
    var HttpStatus = require('http-status-codes');
    var ErrorException = require('../lib/error_exception');

    return {
        exceptionHandler: function(err, req, res, next) {
            console.error(err.stack);
            console.error(err);

            if (!err.code) {
                err.code = HttpStatus.INTERNAL_SERVER_ERROR;
            }

            if (!err.message) {
                err.message = 'Internal Server Error';
            }

            err = new ErrorException(err.message, err.code);
            res.status(err.code).send(err);
        }
    };
};