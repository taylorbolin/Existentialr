var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var lifeAPI = require('./apis/life_api');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));

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