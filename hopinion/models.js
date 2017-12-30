const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const HopinionSchema = mongoose.Schema({
  beerId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  beerName: {
    type: String
  }
});

const Hopinion = mongoose.model('Hopinion', HopinionSchema);

module.exports = {Hopinion};
