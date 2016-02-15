var User = require('../models/usersModel');

module.exports = {

  create: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  read: function(req, res) {
    User.findById(req.params.id)
    .populate('initiatory.temple')
    .populate('endowment.temple')
    .populate('sealing.temple')
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  update: function(req, res) {
    console.log('server got', req.body)
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
      if (err) return res.status(500).send(err);
      else { 
        result
        .populate('sealing.temple endowment.temple initiatory.temple', function(err, user) {
          if (err) return res.status(500).send(err);
          else res.send(user);
        });
      }





    });
  },

  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  }
};