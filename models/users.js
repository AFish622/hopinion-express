const mongoose = require('mongoose');
const bcrypt = require('mongoose');

const UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		default: ""
	},
	lastname: {
		type: String,
		required: true,
		default: ""
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
	hopinion: [{
		beer: String,
		comments: String,
		rating: Number,
	}]
});

UserSchema.methods.toDisplay = function() {
	return {
		firstName: this.firstName || '',
		lastName: this.lastname || '',
		username: this.username || ''
	}
}

UserSchema.methods.validatePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password)
}

UserSchema.methods.hashPassword = function(password) {
	return bcrypt.hash(password, 10)
}

UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

const User = mongoose.model('User', UserSchema);

module.exports = { User, Event }