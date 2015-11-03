var db = require('../models');
var express = require('express');
var request = require('request');
var router = express.Router();
var bcrypt = require('bcrypt');

// router.get('/', function(req, res) {
// 	res.render('index');
// });

// create login form
router.get('/login',function(req,res){
  res.render('auth/login');
});

// create signup form
router.get('/signup',function(req,res) {
  res.render('auth/signup');
});

router.post('/login', function(req, res){
	
})

module.exports = router;