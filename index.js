var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var bcrypt = require('bcrypt');
var db = require('./models');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));

var session = require("express-session");
app.use(session({
	secret: "avsdfsdfvgfhsdfsdbfg", 
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
	if (req.session.user) {
		db.user.findById(req.session.user).then(function(user) {
			if (user) {
				req.currentUser = user;
				console.log(req.currentUser);
				next();
			} else {
				req.currentUser = false;
				console.log(req.currentUser);
				next();
			}
		})
	} else {
		req.currentUser = false;
		console.log(req.currentUser);
		next();
	}
});

var flash = require("connect-flash");
app.use(flash());

app.use(function(req, res, next) {
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.use('/auth', require('./controllers/auth.js'));
app.use('/comments', require('./controllers/comment.js'));
app.use('/main', require('./controllers/main.js'));

var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});