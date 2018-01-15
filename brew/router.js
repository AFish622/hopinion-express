const express = require('express');
const BreweryDb = require('brewerydb-node');
const brewdb = new BreweryDb('d3bcff8131f00fd21f3de895b45be156');
const fetch = require('node-fetch');
const axios = require('axios');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json()

const router = express.Router();

const brewKey = process.env.BREW_KEY;


router.post('/breweries', jsonParser, (req, res) => {
   	const cityQuery = req.body.query;
	axios.get('http://api.brewerydb.com/v2/locations?locality=' + cityQuery + '&key=' + brewKey)
		.then(obj => {
			res.send(obj.data)
		})
		.catch(err => {
			console.log('error', err)
			res.send(err)
		})   
  }
);


router.post('/breweryBeers', jsonParser, (req, res) => {
	console.log('REQ', req.body.breweryId)
	const breweryId = req.body.breweryId
	axios.get('http://api.brewerydb.com/v2/brewery/' + breweryId + '/beers?key=' + brewKey + '&withBreweries=Y')
	.then(obj => {
		res.send(obj.data)
	})
	.catch(err => {
		console.log('error', err)
	})
	
})

router.post('/beers', jsonParser, (req, res) => {
	console.log('REQ', req.body.beerId)
	const beerId = req.body.beerId
	axios.get('http://api.brewerydb.com/v2/beer/' + beerId + '?key=' + brewKey)
	.then(obj => {
		res.send(obj.data)
	})
	.catch(err => {
		console.log('error', err)
	})
	
})

module.exports = { router };
