let express = require('express');
let router = require('./routes/routes');
let app = express();
app.use(express.json());
app.use('/',router);
module.exports = app;


