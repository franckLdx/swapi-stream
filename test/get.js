'use strict';

const swapi = require('../index');

for (const resouce of [swapi.FILMS, swapi.PEOPLE, swapi.PLANETS, swapi.VEHICLES, swapi.STARSHIPS, swapi.SPECIES]) {
  const result = swapi.get(resouce);
  result.on('data', data => console.log(data.name));
  result.on('end', () => console.log('***************************'));
}

const result = swapi.get('foo');
result.on('data', data => console.log(data.title));
result.on('error', (error) => console.log('ERROR', error.toString()));
result.on('end', () => console.log('END'));
