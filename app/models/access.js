module.exports = function (app) {
    var mongoose = app.mongoose;

    var schema = new mongoose.Schema({
        ip: { type: String },
        hostname: { type: String },
        city: { type: String },
        region: { type: String },
        country: { type: String },
        loc: { type: String },
        org: { type: String },
        date: { type: Date, default: new Date() }

    });

    return mongoose.model('Access', schema);
};