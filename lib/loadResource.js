'use strict';

const _ = require('highland');
const request = require('./request');
const debuglog = require('./debug');
const { SwapiParseError, SwapiHttpError } = require('./errors');

const API = 'https://swapi.co/api/';

const swapiRequest = request.defaults({
  headers: {
    Accept: 'application/json',
  },
  timeout: 10000,
});

const getSwapi = async (url) => {
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
  const { results, nextUrl } = parseResponse(response, body);
  results.forEach((result) => {
    push(null, result);
  });
  return nextUrl;
}

async function loadPage(url, push) {
  try {
    const [response, body] = await getSwapi(url);
    const nextUrl = onResponse(response, body, push);
    if (nextUrl) {
      loadPage(nextUrl, push);
    } else {
      push(null, _.nil);
    }
  } catch (err) {
    push(err);
  }
}

exports.get = function getSwapiResource(resource) {
  return _((push) => {
    loadPage(`${API}${resource}`, push);
  });
};
