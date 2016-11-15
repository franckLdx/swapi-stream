'use strict';

const _ = require('highland');
const request = require('./request');
const debuglog = require('./debug');
const Promise = require('any-promise');
const { SwapiParseError, SwapiHttpError } = require('./errors');

const API = 'http://swapi.co/api/';

const swapiRequest = request.defaults({
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000,
});

const getSwapi = (url) => {
  debuglog(`reading ${url}`);
  return swapiRequest.get(url);
};

function parseResponse(response, body) {
  debuglog(`response ${response.request.href} ${response.statusCode} ${response.statusMessage}`);
  if (response.statusCode >= 300) {
    throw new SwapiHttpError(response, body);
  }
  try {
    const jsonBody = JSON.parse(body);
    return { results: jsonBody.results, nextUrl: jsonBody.next };
  } catch (err) {
    throw new SwapiParseError(err, response, body);
  }
}

function onResponse(response, body, push) {
  return new Promise((resolve) => {
    const { results, nextUrl } = parseResponse(response, body);
    for (const result of results) {
      push(null, result);
    }
    resolve(nextUrl);
  });
}

function loadPage(url, push) {
  getSwapi(url)
    .then(([response, body]) => onResponse(response, body, push))
    .then((nextUrl) => {
      if (nextUrl) {
        loadPage(nextUrl, push);
      } else {
        push(null, _.nil);
      }
    })
    .catch((err) => {
      push(err);
    });
}

exports.get = function getSwapiResource(resource) {
  return _((push) => {
    loadPage(`${API}${resource}`, push);
  });
};
