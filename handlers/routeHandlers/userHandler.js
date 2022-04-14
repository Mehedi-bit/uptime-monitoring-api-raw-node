/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/*
 *
 * Title: User Handler
 * Description: handler to handle user related routes
 * Author: Mahdi Hasan
 * Date|: 11/04/2022
 *
 */

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method](requestProperties, callback); // ***
    } else {
        callback(405);
    }
};

// scaffolding _user
handler._user = {};

// for post
handler._user.post = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string'
        && requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName = typeof requestProperties.body.lastName === 'string'
        && requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const phone = typeof requestProperties.body.phone === 'string'
        && requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password = typeof requestProperties.body.password === 'string'
        && requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean'
        && requestProperties.body.tosAgreement.trim().length > 0
            ? requestProperties.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user doesn't already exist
        data.read('users', 'phone', (err) => {
            if (err) {
                // means- na pele read korte parbe na, then error dibe, ami error tai chai, na pele tobei ami insert korbo.
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to db
                data.create('users', 'phone', userObject, (err) => {
                    if(!err) {
                        callback(200, {
                            message: 'User was created successfully',
                        })
                    } else {
                        callback(500, {error: 'could not create user'});
                    }
                });
            } else {
                callback(500, {
                    error: 'There was an error in server side',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem on your request',
        });
    }
};

// for get
handler._user.get = (requestProperties, callback) => {
    callback(200);
};

// for put
handler._user.put = (requestProperties, callback) => {};

// for delete
handler._user.delete = (requestProperties, callback) => {};

// exporting
module.exports = handler;
