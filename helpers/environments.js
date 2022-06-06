/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/*
 *
 * Title: Environments
 * Description: All environment related things
 * Author: Mahdi Hasan
 * Date|: 07/04/2022
 *
 */

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'hkgjkgdfshjhgkhngkh',
    maxChecks: 5,
    twilio: {
        fromPhone: '+15005550006',
        accountSid: 'AC32ec004b1dbc86b7760e3a167b46287c',
        authToken: '19e03284b40bdd0e459bb2c904d1d980',
    },
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'dhsgjkbfdkfmdnfvfhb',
    maxChecks: 5,
    twilio: {
        fromPhone: '+15005550006',
        accountSid: 'AC832b26d2e03c7b8b39202cba2bb63326',
        authToken: '390475c48129c450f4a337ea68976308',
    },
};

// determine which environment has passed
const currentEnvironment = typeof process.env.NODE_ENV === 'string'
        ? process.env.NODE_ENV
        : 'staging';

// export corresponding environment object
const environmentToExport = typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export module
module.exports = environmentToExport;
