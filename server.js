const express = require('express');
const BreweryDb = require('brewerydb-node');
const brewdb = new BreweryDb('d3bcff8131f00fd21f3de895b45be156');

const app = express();

const query = 'san francisco';

// brewdb.search.breweries( { q: query }, (err, data) => {
// 	console.log('BEEEEEEEEEEEEERS', data)
// })

console.log('hello')

app.listen(8080)
