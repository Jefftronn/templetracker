var express = require('express'),
	expressSession = require('express-session'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	facebookStrategy = require('passport-facebook').Strategy,
	config = require('./config');

// Controllers
var VisitsController= require('./controllers/visitsController');
var TemplesController= require('./controllers/templesController');
var UsersController= require('./controllers/usersController');
var UsersModel = require('./models/usersModel');

var app =express(),
	port = config.port;

var mongoUri = config.mongoUri;

mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('connected to mongoDB at: ', mongoUri);
});

// middleware
app.use(bodyParser.json());
app.use(express.static(__dirname+ '/../public'));
app.use(expressSession({
	secret: config.sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new facebookStrategy(config.facebook, function(token, refreshToken, profile, done) {
	// connect to our database
	// console.log(profile);

	// to check for a user
	UsersModel.findOne({
		'login.facebook': profile.id
	}, function(err, result) {
		if (err) {
			return done(err, false);
		}
		else if (result) {
			return done(null, result);
		}
		else {
			var tempNewUser = {
				name: profile.displayName, 
				// email: profile.email, get certified then change to what facebook gives you
				login: {
					facebook: profile.id
				},
				userProfileImage: profile.photos[0].value
			};
			var newUser = new UsersModel(tempNewUser)
			newUser.save(function(err, saveResult) {
				if(err) {
					return done(err, false) 
				}
				else {
					return done(null, saveResult)
					aUser = saveResult
				}
			})
		}
	})

}));

 

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
	// console.log(obj);
  done(null, obj);

});


// endpoint
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/#/dashboard',
	failureRedirect: '/#/login'
}));

app.get('/auth/current', function (req, res) {
	if(req.isAuthenticated()) {
		res.json(req.user);
	} else {
		res.sendStatus(401);
	}
});

app.get('/auth/logout', function (req, res) {
	req.logout();
	res.redirect('/#/login');
	console.log('logout now')
});


app.listen(port, function() {
	console.log('Server is running on port ' + port);
});


// to check if there is a user and if not send 403 and is a user go next.

function isAuth(req, res, next){
	if (!req.user){
		res.sendStatus(403);
		return;
	}
	next()
}


// ENDPOINTS FOR DASHBOARD
app.post('/api/visit', isAuth, VisitsController.create);
app.get('/api/visit', isAuth, VisitsController.read);
app.put('/api/visit/:id', isAuth, VisitsController.update);
app.delete('/api/visit/:id', isAuth, VisitsController.delete);

//  ENDPOINTS for temples

app.post('/api/temple', TemplesController.create);
app.get('/api/temple', TemplesController.read);
app.put('/api/temple/:id', TemplesController.update);
app.delete('/api/temple/:id', TemplesController.delete);


// ENDPOINTS FOR USERS
app.post('/api/user', isAuth, UsersController.create);
app.get('/api/user/:id', isAuth, UsersController.read);
app.put('/api/user/:id', isAuth, UsersController.update);
app.delete('api/user/:id', isAuth, UsersController.delete);


// ENDPOINTS FOR SINGLE VISIT
// VISIT #4
app.get('/api/visit/:id', isAuth, VisitsController.readSingleVisit);

