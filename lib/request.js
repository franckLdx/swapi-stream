'use strict';

const request = require('request');
const thenifyAll = require('thenify-all');

const methods = ['get', 'head', 'post', 'put', 'patch', 'delete'];

const wrappedpRequest = thenifyAll(request, {}, methods);

module.exports = wrappedpRequest;
