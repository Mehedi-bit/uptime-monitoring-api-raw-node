/*
 *
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Mahdi Hasan
 * Date|: 03/04/2022
 *
 */
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'This is sample url',
    });
};

module.exports = handler;
