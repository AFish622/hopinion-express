const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const { Hopinion } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', {session: false})

router.post('/', jsonParser, (req, res, next) => {
  let addHopinion = {
  		beerId: req.body.beerId,
  		text: req.body.values.review,
  		rating: req.body.values.rating,
  		userId: req.body.userId.id,
  		beerName: req.body.beerName
  }

  Hopinion.create(addHopinion, (err, beer) => {
  	if (err) {
  		console.log('ERROR', err)
  	}
  	res.json({beer: beer})
  })
});

router.get('/:userId', jsonParser, (req, res) => {
	Hopinion.find({userId: req.params.userId})
	.then(hopinions => {
		res.send({hopinions})
	})
});

router.delete('/:hopId', (req, res) => {
	const hopinionId = req.params.hopId;
	Hopinion.findByIdAndRemove({_id: hopinionId})
		.then(hopionion => {
			res.json({hopId: hopinionId}); 
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

router.post('/update/:hopId', jsonParser, (req, res) => {
	const hopId = req.params.hopId;
	const hopText = req.body.text
	Hopinion.findOneAndUpdate({_id: hopId}, {$set: {text: hopText}}, {new: true})
		.then(hopinion => {
			console.log('hophop', hopinion)
			res.json({hopinion: hopinion}); 
		})
		.catch(err => {
			res.status(500).send(err);
		});
});





module.exports = { router };
