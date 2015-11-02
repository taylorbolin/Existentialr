var express = require('express');
var request = require('request');
var router = express.Router();
var unirest = require('unirest');
var birthdate;
var gendertype;

module.exports = router;

router.get('/', function(req, res) {
	birthdate = req.query.birth;
	gendertype = req.query.gender;
	// console.log(birthdate);
	unirest.get("https://life-left.p.mashape.com/time-left?birth=" + birthdate + "&gender=" + gendertype)
		.header("X-Mashape-Key", "qhSLG3HJf3mshqvpR69eQnqdazDnp1KmrGBjsnrenrMyDN6lqV")
		.header("Accept", "application/json")
		.end(function (result) {
		  console.log(result.body);
		});
	res.render('main/index');
});



