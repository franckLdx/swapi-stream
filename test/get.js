'use strict';

const swapi = require('../index');

for (const resouce of ['films', 'people', 'planets', 'vehicles', 'starships', 'species']) {
  const result = swapi.get(resouce);
  result.on('data', data => console.log(data.name));
}
