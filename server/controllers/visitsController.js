var Visit = require('../models/visitsModel');

module.exports = {

  create: function(req, res) {
    req.body.userId = req.user._id;
    var newVisit = new Visit(req.body);
    newVisit.save(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  read: function(req, res) {
    // This is so that the user logged in can only see their own visits.
    if(!req.user){res.sendStatus(403);return;}
    Visit.find({
      userId: req.user._id
    })
    // .populate is gain the objectid plus properties in the schema.
    .populate('temple')
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

    // VISIT #5
    readSingleVisit: function(req, res) {
    // This is so that the user logged in can only see their own visits.
    if(!req.user){res.sendStatus(403);return;}
    Visit.find({
      _id:req.params.id
    })
    // .populate is gain the objectid plus properties in the schema.
    .populate('temple')
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  update: function(req, res) {
    console.log('server got', req.body)
    Visit.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  delete: function(req, res) {
    Visit.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  }
};