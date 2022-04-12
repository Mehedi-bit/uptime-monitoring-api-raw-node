/*
 *
 * Title: Utilities
 * Description: Important utility functions
 * Author: Mahdi Hasan
 * Date|: 12/04/2022
 *
 */
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

// export module
utilities.module.exports = utilities;
