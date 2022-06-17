let mongoose = require('mongoose');
const errors = require('../../api/shared/errors');



function getMongoDbConnection(next) {
    let conString =  "mongodb+srv://fiyoore:fiyoore_123@cluster0.nzssu.mongodb.net/Students?retryWrites=true&w=majority";
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