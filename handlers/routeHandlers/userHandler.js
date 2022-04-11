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
handler._user.post = (requestProperties, callback) => {};

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
