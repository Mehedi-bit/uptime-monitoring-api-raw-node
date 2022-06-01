/*
 *
 * Title: Uptime Monitoring Application
 * Description: A RESTFUL API to monitor up or down time of user defined links
 * Author: Mahdi Hasan
 * Date|: 03/04/2022
 *
 */
// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const { sendTwilioSms } = require('./helpers/notifications');

// app object - module scaffolding
const app = {};

// @TODO remove later
sendTwilioSms('01790231866', 'Ya Mahdi Make dua to Allah to Get Married Soon', (err) => {
    console.log('This is the error', err);
});

// create Server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`environment variable is: ${process.env.NODE_ENV}`);
        console.log(`Listening to port ${environment.port}`);
    });
};

// handle Request Response
app.handleReqRes = handleReqRes;

// Start the Server
app.createServer();
