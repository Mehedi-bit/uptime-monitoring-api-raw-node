/*
 *
 * Title: Project initial file
 * Description: Initial file to start thr node server and workers
 * Author: Mahdi Hasan
 * Date|: 05/06/2022
 *
 */
// dependencies
const server = require('./lib/server');
const workers = require('./lib/worker');

// app object - module scaffolding
const app = {};

app.init = () => {
    // start the servers
    server.init();
    // start the worker
    workers.init();
};

app.init();

// export the app
module.exports = app;
