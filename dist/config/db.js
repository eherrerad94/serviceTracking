'use strict';

var config = {
    dev: 'mongodb://localhost/dev', //local mongodb
    prod: 'mongodb://localhost/prod', //local mongodb
    webhost: '',
    secretKey: 'secretKey' //to use in jsonwebtoken
};

module.exports = config;