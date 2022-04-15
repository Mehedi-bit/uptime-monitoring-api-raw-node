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
const { parseJSON } = require('../../helpers/utilities');

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);  
    } else {
        callback(405);
    }
};

// scaffolding _users
handler._users = {};

// for post
handler._users.post = (requestProperties, callback) => {
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
        && requestProperties.body.tosAgreement
            ? requestProperties.body.tosAgreement
            : false;
    console.log(firstName, lastName);     // ***

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user doesn't already exist
        data.read('users', 'phone', (err1) => {
            if (err1) {
                // means- na pele read korte parbe na, then error dibe, ami error tai chai, na pele tobei ami insert korbo.
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to db
                data.create('users', 'phone', userObject, (err2) => {
                    if(!err2) {
                        callback(200, {
                            message: 'User was created successfully!',
                        });
                    } else {
                        callback(500, { error: 'Could not create user!' });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was an error in server side!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem on your request',
        });
    }
};
// @TODO: Authentication
// for get
handler._users.get = (requestProperties, callback) => {
    // check the phone number is valid
    const phone = typeof requestProperties.queryStringObject.phone === 'string'
        && requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;
    if(phone) {                                       // *** for accuracy check if(phone === requestProperties.body.phone)
        // lookup the user
        data.read('users', 'phone', (err, u) => {       //// 'phone' > phone
            const user = { ...parseJSON(u) };
            if(!err && user) {
                delete user.password;
                callback(200, user);
            } else {
                callback(404, {'error': 'User not found'})
            }
        })
    } else {
        callback(404, {'error': 'User not found'})
    }
};
// @TODO: Authentication
// for put 
handler._users.put = (requestProperties, callback) => {

    // check the phone number is valid
    const phone = typeof requestProperties.body.phone === 'string'
        && requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;
    

    const firstName = typeof requestProperties.body.firstName === 'string'
        && requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName = typeof requestProperties.body.lastName === 'string'
        && requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const password = typeof requestProperties.body.password === 'string'
        && requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if(phone) {
        if (firstName || lastName || password) {
            // lookup the user
            data.read('users', 'phone', (err1, uData) => {      //// 'phone' > phone
                const userData = {...parseJSON(uData) };
                if(!err1 && userData) {

                    if(firstName){
                        userData.firstName = firstName;
                    }
                    if(lastName){
                        userData.lastName = lastName;
                    }
                    if(password){
                        userData.password = hash(password);
                    }

                    // store to database / update database
                    data.update('users', 'phone', userData, (err2) => {
                        if(!err2){
                            callback(200, {message: 'User was updated successfully.'})
                        } else {
                            callback(500, {error: 'There was a problem in the server side!'})
                        }
                    })

                } else {
                    callback(400, {error: 'Invalid phone number. Please try again!'})
                }
            })
        }
    } else {
        callback(400, {error: 'Invalid phone number. Please try again!'})
    }

};
// @TODO: Authentication
// for delete
handler._users.delete = (requestProperties, callback) => {

    // check the phone number is valid
    const phone = typeof requestProperties.queryStringObject.phone === 'string'
        && requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;
    if(phone) {
        // lookup the user
        data.read('users', 'phone', (err1, userData) => {
            if(!err1 && userData) {
                data.delete('users', 'phone', (err2) => {
                    if(!err2) {
                        callback(200, {message: 'User was successfully deleted.'})
                    } else {
                        callback(500, {error: 'There was a server side error!'})
                    }
                })
            } else {
                callback(500, {error: 'There was a server side error!'})
            }
        })
    } else {
        callback(400, {error: 'There was a problem in your request!'})
    }
};

// exporting
module.exports = handler;
