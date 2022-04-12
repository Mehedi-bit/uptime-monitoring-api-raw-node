/*
 *
 * Title: User Handler
 * Description: handler to handle user related routes
 * Author: Mahdi Hasan
 * Date|: 11/04/2022
 *
 */
// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method]();
    } else {
        callback(405);
    }
};

// scaffolding _user
handler._user = {};

// for post
handler._user.post = (requestProperties, callback) => {
    const firstName =
 typeof requestProperties.body.firstName === 'string'
        && requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
 typeof requestProperties.body.lastName === 'string'
        && requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const phone =
 typeof requestProperties.body.phone === 'string'
        && requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
 typeof requestProperties.body.password === 'string'
        && requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    const tosAgreement =
 typeof requestProperties.body.tosAgreement === 'boolean'
        && requestProperties.body.tosAgreement.trim().length > 0
            ? requestProperties.body.tosAgreement
            : null;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user doesn't already exist
    } else {
        callback(400, {
            error: 'You have a problem on your request',, 
        });
    }
};

// for post
handler._user.get = (requestProperties, callback) => {
    callabck(200);
};
// for post
handler._user.put = (requestProperties, callback) => {};
// for post
handler._user.delete = (requestProperties, callback) => {};

// exporting
module.exports = handler;
