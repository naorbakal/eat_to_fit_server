const http = require('http');
const app = require('./app');
global.Promise = require('bluebird') 

const port = process.env.PORT || 3000;

const server = http.createServer(app);

/*
process.on('unhandledRejection', function(err) {
    console.log(err);
});
*/
server.listen(port);