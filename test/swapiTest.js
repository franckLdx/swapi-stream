'use strict';

const index = require('../index');
const { SwapiHttpError } = require('../lib/errors');

require('chai').should();

describe('Swapi stream test with access to https://swapi.co', function () {
  this.timeout(20000);
  describe('Get valid resources', function () {
    const RESOURCES = new Map([
      [index.FILMS, 7],
      [index.PEOPLE, 87],
      [index.PLANETS, 61],
      [index.SPECIES, 37],
      [index.STARSHIPS, 37],
      [index.VEHICLES, 39]]
    );
    RESOURCES.forEach((expectedCount, resourceName) => {
      it(`${resourceName} shoud have the expected items count`, function (done) {
        let count = 0;
        const swapiStream = index.get(resourceName);
        swapiStream.on('data', () => { count += 1; });
        swapiStream.on('end', () => {
          try {
            count.should.be.deep.equal(expectedCount);
            done();
          } catch (err) {
            done(err);
          }
        });
        swapiStream.on('error', done);
      });
    });
  });
  describe('Get unvalid resources', function () {
    it('Asking for an unvalid resource should emit an error', function (done) {
      const WRONG_RESOURCE = 'foo';
      const swapiStream = index.get(WRONG_RESOURCE);
      swapiStream.on('data', () => {});
      swapiStream.on('end', () => { done('Should get an error'); });
      swapiStream.on('error', (error) => {
        try {
          error.should.be.an.instanceof(SwapiHttpError);
          error.toString().should.be.deep.equal(`Error while getting https://swapi.co/api/${WRONG_RESOURCE}: 404/NOT FOUND`);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
});
