/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/*
 *
 * Title: Notifications library
 * Description: important functions to notify users
 * Author: Mahdi Hasan
 * Date: 30/05/2022
 *
 */

// dependencies for
const https = require('https');
const { twilio } = require('./environments');

// module scaffolding
const notifications = {};

// send sms to user using twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
    // input validation
    const userPhone = typeof phone === 'string'
        && phone.trim().length === 11
        ? phone.trim()
        : false;

    const userMsg = typeof msg === 'string'
        && msg.trim().length > 0
        && msg.trim().length <= 1600
        ? msg.trim()
        : false;

    if (userPhone && userMsg) {
        // configure the request payload
        const payload = {
            From: twilio.fromPhone,
            To: `+88${userPhone}`,
            Body: userMsg,
        };

        // stringify the payload objects
        const stringifyPayload = JSON.stringify(payload);

        // configure the request details objects
        const requestDetails = {
            hostName: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json'`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        // instantiate the request object
        const req = https.request(requestDetails, (res) => {
            // get the status of the sent request
            const status = res.statusCode;
            // callback successfully if the request went through
            if (status === 200 || status === 201) {
                // no error
                callback(false);
            } else {
                callback(`Status code returned was ${status}`);
            }
        });

        req.on('error', (e) => {
            callback(e);
        });

        req.write(stringifyPayload);
        req.end();
    } else {
        callback('Given parameters were missing or invalid!');
    }
};

// exports
module.exports = notifications;
