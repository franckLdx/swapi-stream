'use strict';

const SwapiError = class extends Error {
  constructor(response, body) {
    super();
    this.response = response;
    this.body = body;
  }
};
exports.SwapiError = SwapiError;

exports.SwapiHttpError = class extends SwapiError {
  constructor(response, body) {
    super(response, body);
    this.message = `Error while getting ${response.request.href}: ${response.statusCode}/${response.statusMessage}`;
  }

  toString() {
    return this.message;
  }
};

exports.SwapiParseError = class extends SwapiError {
  constructor(err, response, body) {
    super(response, body);
    this.message = `Cautch an error while parsing body response from ${response.request.href}.\n Error:${err.toString()}\nbody:${body}`;
  }

  toString() {
    return this.message;
  }
};
