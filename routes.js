/*
 *
 * Title: Routes
 * Description: Application Routes
 * Author: Mahdi Hasan
 * Date|: 03/04/2022
 *
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;
