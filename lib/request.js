'use strict';

const request = require('request');
const thenifyAll = require('thenify-all');

const methods = ['get', 'head', 'post', 'put', 'patch', 'delete'];

const wrapedpRequest = thenifyAll(request, {}, methods);

module.exports = wrapedpRequest;
