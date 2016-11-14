'use strict';

const loadResource = require('./lib/loadResource');

exports.FILMS = 'films';
exports.PEOPLE = 'people';
exports.PLANETS = 'planets';
exports.VEHICLES = 'vehicles';
exports.STARSHIPS = 'starships';
exports.SPECIES = 'species';

exports.get = loadResource.get;
