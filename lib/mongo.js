var mongoose = require('mongoose');
var opts = {
 server: {
 socketOptions: { keepAlive: 1 }
 }
};
//set env params
require('dotenv').config({path: './config.env'})
switch(process.env.NODE_ENV){
    case 'development':
        mongoose.connect(process.env.MONGODB, opts);
        console.log('dev db connected');
        break;
    case 'production':
        mongoose.connect(process.env.MONGODB, opts);
        console.log('prod db connected');
        break;
    default:
        throw new Error('Unknown execution environment: ' + process.env.NODE_ENV);
}

var db = mongoose.connection;

module.exports = db
