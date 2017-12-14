const express = require('express');
const BreweryDb = require('brewerydb-node');
const brewdb = new BreweryDb('d3bcff8131f00fd21f3de895b45be156');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json()

const router = express.Router();

router.post('/breweries', jsonParser, (req, res) => {
   	const query = req.body.query;
	brewdb.search.breweries( { q: query, hasLabels: 'Y', withLocations: 'Y' }, (err, breweries) => {
		res.json({
			data: breweries
		});
	})
  }
);

router.post('/beers', jsonParser, (req, res) => {
	brewdb.search.beers({ q: "6PBXvz", withBreweries: 'Y' }, (err, brewery) => {
		console.log("BREWERY", brewery.map(breweries => {
			return breweries.breweries
		}))
	})
})

module.exports = { router };
