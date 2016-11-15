'use strict';

const Promise = require('any-promise');

const mockery = require('mockery');
require('chai').should();

describe('Get a wrong response', function () {
  let index;
  beforeEach(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
  });

  afterEach(function () {
    mockery.disable();
  });

  it('Asking for an valid resource but get a wrong response: should emit an error', function (done) {
    const requestMock = {
      defaults() {
        return this;
      },
      get(url) {
        return new Promise((resolve) => {
          setImmediate(() => {
            resolve(
              [
                { statusCode: 200, statusMessage: 'OK', request: { href: url } },
                '{results: []}',
              ]
            );
          });
        });
      },
    };
    mockery.registerMock('./request', requestMock);
    index = require('../index');
    const swapiStream = index.get(index.FILMS);
    swapiStream.on('data', () => {});
    swapiStream.on('end', () => { done('Should get an error'); });
    swapiStream.on('error', (error) => {
      try {
        error.toString().should.match(/^Cautch an error while parsing body response/);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
