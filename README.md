# swapi-stream

Download [swapi data](https://swapi.co/) using a read stream.

## Requirement
* Node >= 6.0.0
* To be fan of Star Wars

## Installation
npm install --save swapi-stream

## Usage
To get films list:
```javascript
const swapiStream = require('swapi-stream');
const result = swapiStream.get(swapiStream.FILMS);
result.on('data', data => console.log(data.title));
result.on('error', (error) => console.log('ERROR', error.toString()));
result.on('end', () => console.log('END'));
```
To get planets list:
```javascript
const swapiStream = require('swapi-stream');
const result = swapiStream.get(swapiStream.PLANETS);
result.on('data', data => console.log(data.title));
result.on('error', (error) => console.log('ERROR', error.toString()));
result.on('end', () => console.log('END'));
```

## API
```javascript
const myStream = swapiStream.get(<resourceName>);
```
__resourceName__ is mandatory. It's the resource name as defined [swapi data Rest API](https://swapi.co/documentation#root). Rather than typing the name, you can use swapiStream constants (like shown in above examples):
* FILMS
* PEOPLE
* PLANETS
* VEHICLES
* STARSHIPS
* SPECIES

__swapiStream.get__ returns a stream emitting the regular events data, end and error. As it's a stream, it returns all entities of the resource. If this does not suit your need, you may prefer a module that returns entities page by page like [swapi-node](https://www.npmjs.com/package/swapi-node).
