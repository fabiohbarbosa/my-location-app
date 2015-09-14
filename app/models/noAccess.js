module.exports = function (app) {
    var mongoose = app.mongoose;
    var Type = require('../const/type')();

    var schema = new mongoose.Schema({
        info: { type: String },
        type: { type: Type },
        date: { type: Date, default: new Date() }
    });

    return mongoose.model('NoAccess', schema);
};