/*
 *
 * Title: Environments
 * Description: All environment related things
 * Author: Mahdi Hasan
 * Date|: 07/04/2022
 *
 */

// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

lib.basedir = path.join(`${__dirname}/../.data/`);

// write data to file
lib.create = (dir, fcile, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir}/${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to stirng
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new file!');
                        }
                    });
                } else {
                    callback('Error writing to new file!');
                }
            });
        } else {
            callback('There was an error, file may already exists');
        }
    });
};

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir}/${dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    });
};

// update existing file
lib.update = (dir, file, data, callback) => {
    // file open for writing
    fs.open(`${lib.basedir}/${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert the data to stringify
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            // close the file
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing file');
                                }
                            });
                        } else {
                            // error
                            callback('Error writing to file');
                        }
                    });
                } else {
                    callback('Error truncating file!');
                }
            });
        } else {
            callback('Error updating. File may not exist');
        }
    });
};

// delete existing file
lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir}/${dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    });
};

module.exports = lib;
