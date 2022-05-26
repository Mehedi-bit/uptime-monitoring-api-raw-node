
/*
 *
 * Title: check Handler
 * Description: handler to handle user defined checks
 * Author: Mahdi Hasan
 * Date|: 26/05/2022
 *
 */

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { parseJSON, createRandomString } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');
const { user } = require('../../routes');
const { maxChecks } = require('../../helpers/environments');

// module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._check[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

// scaffolding _check
handler._check = {};

handler._check.post = (requestProperties, callback) => {
    // validate input
    const protocol = typeof(requestProperties.body.protocol) === 'string'
    && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1 ? 
    requestProperties.body.protocol : false;

    const url = typeof(requestProperties.body.url) === 'string'
    && requestProperties.body.url.trim().length > 0
    ? requestProperties.body.url : false;

    const method = typeof(requestProperties.body.method) === 'string'
    && ['get', 'post', 'put', 'delete'].indexOf(requestProperties.body.method) > -1
    ? requestProperties.body.method : false;

    const successCodes = typeof(requestProperties.body.successCodes) === 'object'
    && requestProperties.body.successCodes instanceof Array
    ? requestProperties.body.successCodes : false;

    const timeoutSeconds = typeof(requestProperties.body.timeoutSeconds) === 'object'
    && timeoutSeconds % 1 === 0 && timeoutSeconds >= 1 && timeoutSeconds <= 5
    ? requestProperties.body.timeoutSeconds : false;
    
    if (protocol && url && method && successCodes && timeoutSeconds) {
        const token = typeof requestProperties.headerObject.token === 'string'
        ? requestProperties.headerObject.token
        : false;

        // lookup the user phone by reading the token
        data.read('tokens', token, (err1, tokenData) => {
            if (!err1 && tokenData) {
                const userPhone = parseJSON(tokenData).phone;
                
                // lookup the user
                data.read('users', userPhone, (err2, userData) => {
                    if (!err2 && userData){
                        // verify the token
                        tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {  // *** userPhone -> phone
                            if (tokenIsValid) {
                                const userObject = parseJSON(userData);
                                const userChecks = typeof(userObject.checks) === 'object'
                                && userObject.checks instanceof Array ? userObject.checks : [];

                                if (userChecks.length < maxChecks) {
                                    const checkId = createRandomString(20);
                                    let checkObject = {
                                        id: checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeoutSeconds,
                                    }
                                    // save the object
                                    data.create('checks', checkId, checkObject, (err3) => {
                                        if (!err3) {
                                            // add check id to the user's object
                                            userObject.checks = userChecks;
                                        } else {
                                            callback(500, {
                                                error: 'There was a problem in the server side',
                                            })
                                        }
                                    })

                                } else {
                                    callback(401, {
                                        error: 'User has already reached max check limit!',
                                    })
                                }

                            } else {
                                callback(403, {
                                    error: 'Authentication problem!',
                                })
                            }
                        })
                    } else {
                        callback(403, {
                            error: 'User not found',
                        })
                    }
                })
            } else {
                callback(403, {
                    error: 'Authentication problem!',
                })
            }
        })
    } else {
        callback(400, {
            error: 'You have a problem on your request',
        });
    }
};

handler._check.get = (requestProperties, callback) => {
};

handler._check.put = (requestProperties, callback) => {
};

handler._check.delete = (requestProperties, callback) => {
};

// exporting
module.exports = handler;
