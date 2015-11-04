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

router.get("/", function(req, res) {
	if (req.currentUser) {
		res.render("main/index");
	} else {
		req.flash("danger", "ACCESS DENIED!");
		res.redirect("/");
	}
});

router.post('/', function(req, res) {
	birthdate = req.body.birth;
	// console.log("B",birthdate)
	gendertype = req.body.gender;
	// console.log("G",gendertype)
	// console.log(birthdate);
	unirest.get("https://life-left.p.mashape.com/time-left?birth=" + birthdate + "&gender=" + gendertype)
		.header("X-Mashape-Key", "API KEY HERE")
		.header("Accept", "application/json")
		.end(function (result, err) {
			// console.log(result.status);
			// console.log(result.headers);
			console.log(result.body.success);
			// console.log(result)
			// if (result.body.success){
			// console.log(result.body.data.yearsLeft);
		  // console.log("Time remaining: "+Math.round(result.body.data.yearsLeft)+" years");
		  // console.log("Life completed: "+Math.round(result.body.data.lifeComplete*100)+"%");
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



//  if (!err && response.statusCode === 200 && data.Search) {
//       res.render('movies/index', {movies: data.Search,
//                             q: query});
//     } else {
//       res.render('error');
//     }
//   });
// });

