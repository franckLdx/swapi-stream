'use strict';

const _ = require('highland');
const request = require('./request');
const debuglog = require('./debug');
const Promise = require('any-promise');

const API = 'https://swapi.co/api/';

const getSwapi = (url) => {
  debuglog(`reading ${url}`);
  return request.get(url, {
    headers: {
      Accept: 'application/json',
    },
  });
};

function onResponse(response, body, push) {
  return new Promise((resolve) => {
    const jsonBody = JSON.parse(body);
    for (const result of jsonBody.results) {
      push(null, result);
    }
    resolve(jsonBody.next);
  });
}

exports.get = function getSwapiResource(resource) {
  let nextUrl = `${API}${resource}`;
  return _((push, next) => {
    getSwapi(nextUrl)
      .then(([response, body]) => onResponse(response, body, push))
      .then((_nextUrl) => {
        nextUrl = _nextUrl;
        if (nextUrl) {
          next();
        } else {
          push(null, _.nil);
        }
      })
      .catch((err) => { push(err); });
  });
};
