var mongoose = require('mongoose');

var visitSchema = new mongoose.Schema ({

  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
	
  title: { 
		type: String, 
  		unique: true, 
  		required: true
  		},

  temple: { 
  		type: mongoose.Schema.Types.ObjectId, ref: 'Temple'
  		},

  date: { 
  		type: Date,
  		required: true
  		},

  grounds: {
  		type: Boolean
  },

  openHouse: {
  		type: Boolean
  },

  baptisms: {
  		type: Number,
      required: true
  },

  initiatories: {
  		type: Number,
      required: true
  },

  endowments: {
  		type: Number,
      required: true
  },

  sealings: {
  		type: Number,
      required: true
  },  

  visitJournal: {
  		type: String
  },

  images: [{
  	type: String	 
  }]

});

module.exports = mongoose.model('Visit', visitSchema);