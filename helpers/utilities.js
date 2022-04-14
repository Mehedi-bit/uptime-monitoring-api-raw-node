/*
 *
 * Title: Utilities
 * Description: Important utility functions
 * Author: Mahdi Hasan
 * Date|: 12/04/2022
 *
 */

// dependencies
const crypto = require('crypto');
const environments = require('./environments');

// module scaffolding
const utilities = {};

// Parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    
};

// hash the string  or password etc
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        // eslint-disable-next-line prettier/prettier
        const hash = crypto.createHmac('sha256', environments.secretKey)
            .update('str')
            .digest('hex');
        return hash;
    }
    return false;
};

// export module
module.exports = utilities;
