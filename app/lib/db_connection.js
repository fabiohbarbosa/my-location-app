module.exports = function() {
    var mongoose = require('mongoose');

    var mongoUrl = 'mongodb://localhost/my-location-app';
    mongoose.connect(mongoUrl, function(err) {
        if (err) {
            console.error('ERROR connecting to: ' + mongoUrl + '. ' + err);
            process.exit();
        } else {
            console.log('Succeeded connected to: ' + mongoUrl);
        }
    });
    return mongoose;
};