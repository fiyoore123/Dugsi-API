let mongoose = require('mongoose');
const errors = require('../../api/shared/errors');
require('dotenv').config();


function getMongoDbConnection(next) {
    let conString =  process.env.CONNECTION_STRING;
    mongoose.connect(conString,function (conError,con){
        if (conError) {
            next(errors.dbConnectionFailed,null);
            errors.dbConnectionFailed.message = conError;
            console.error(errors.dbConnectionFailed);
            return;
        }
        next(null,con);

});
}
module.exports.getMongoDbConnection = getMongoDbConnection;