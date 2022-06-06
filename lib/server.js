/*
 *
 * Title: Server library
 * Description: Server related files
 * Author: Mahdi Hasan
 * Date: 05/06/2022
 *
 */
// dependencies
const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');
const environment = require('../helpers/environments');

// server object - module scaffolding
const server = {};
// create Server
server.createServer = () => {
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(environment.port, () => {
        console.log(`environment variable is: ${process.env.NODE_ENV}`);
        console.log(`Listening to port ${environment.port}`);
    });
};

// handle Request Response
server.handleReqRes = handleReqRes;

// Start the Server
server.init = () => {
    server.createServer();
};

// export
module.exports = server;
