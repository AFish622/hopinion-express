const BreweryDb = require('brewerydb-node');
const brewdb = new BreweryDb('d3bcff8131f00fd21f3de895b45be156');

const query = 'anchor';

brewdb.search.beers( { q: query, hasLabels: 'Y' }, (err, data) => {
	console.log('BEEEEEEEEEEEEERS', data)
})