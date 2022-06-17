require('dotenv').config();
let http = require('http');
let app = require('./app');

let mongoose = require('../dbConnection/mongoDb/mongoose');
let server = http.createServer(app);
const port = 5000;
mongoose.getMongoDbConnection(function (conError,con) {
    if(conError){
        console.error(conError);
        return;
    }
    console.log("Database connected.");
    
    server.listen(port,()=>{
        console.log(  " server is running " + port);
    });
})


//{ useNewUrlParser:true},