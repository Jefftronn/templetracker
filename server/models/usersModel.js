var mongoose = require('mongoose');

var userSchema = new mongoose.Schema ({

	name: {
		type: String
	},

	email: {
		type: String
	},

	userProfileImage: {
		type: String
	},

	login: { 
		facebook: {
			type: String
		}
		// local
	},

	visits: [{ 
		type: mongoose.Schema.Types.ObjectId, ref: 'Visit'
	}],

	baptism: {
		type: Date
	},

	initiatory: {
		date: {
			type: Date,
		},
		temple: {
			type: mongoose.Schema.Types.ObjectId, ref: 'Temple'
		}
	},

	endowment: {
		date: {
			type: Date,
		},
		temple: {
			type: mongoose.Schema.Types.ObjectId, ref: 'Temple'
		}
	},

	sealing: {
		date: {
			type: Date,
		},
		temple: {
			type: mongoose.Schema.Types.ObjectId, ref: 'Temple'
		}
	},

	profileJournal: {
		type: String
	}

});

module.exports = mongoose.model('User', userSchema);