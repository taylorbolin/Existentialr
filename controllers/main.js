var express = require('express');
var request = require('request');
var router = express.Router();
var unirest = require('unirest');
var birthdate;
var gendertype;

module.exports = router;

router.get('/', function(req, res) {
	res.render('main/index', {yearsLeft: null, lifeComplete: null});
});

// router.get('/', function(req, res) {
// 	if (req.currentUser) {
// 		res.render('main/index', {yearsLeft: null, lifeComplete: null});
// 	} else {
// 		req.flash("danger", "ACCESS DENIED!");
// 		res.redirect('auth/signup');
// 	}
// });


router.post('/', function(req, res) {
	birthdate = req.body.birth;
	gendertype = req.body.gender;
	unirest.get("https://life-left.p.mashape.com/time-left?birth="+birthdate+"&gender="+gendertype)
		.header("X-Mashape-Key", process.env.LIFE_KEY)
		//.header("X-Mashape-Key", "XAEiRyqb4QmshFor5IzbZteM2HsAp1TRGoRjsnw1uEXJziRIEa")
		.header("Accept", "application/json")
		.end(function (result, err) {
			
			if (result.body.success === true) {
				var yearsLeft = "Time remaining: "+Math.round(result.body.data.date.years)+" years, "
								+Math.round(result.body.data.date.months)+" months, "
								+Math.round(result.body.data.date.days)+" days, "
								+Math.round(result.body.data.date.hours)+" hours and "
								+Math.round(result.body.data.date.minutes)+" minutes"
				var lifeComplete = "Life completed to date: "+Math.round(result.body.data.lifeComplete*100)+"%"
				res.render('main/index', {yearsLeft: yearsLeft, lifeComplete: lifeComplete});
			} else {
				res.render('error');
			}
			
		});
			
	});


