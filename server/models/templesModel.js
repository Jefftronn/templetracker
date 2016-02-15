var mongoose = require('mongoose');

var templeSchema = new mongoose.Schema ({
	
  name: {
  		type: String
  },

  address: {
  		type: String
  },  

  defaultPic: {
  		type: String
  },

  location: {
    type: String
  },

  longitude: {
    type: String
  },

  latitude: {
    type: String
  }

});

module.exports = mongoose.model('Temple', templeSchema);