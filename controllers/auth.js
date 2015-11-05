var db = require('../models');
var express = require('express');
var request = require('request');
var router = express.Router();
var bcrypt = require('bcrypt');
var flash = require('flash');
var session = require('express-session');


router.route("/signup")
	.get(function(req, res) {
		res.render("auth/signup");
	})
	.post(function(req, res) {
		if (req.body.password !== req.body.password2) {
			req.flash("danger", "Passwords entered do not match. Please try again.");
			res.redirect("/auth/signup");
		} else {
			db.user.findOrCreate({
				where: {
					email: req.body.email
				},
				defaults: {
					email: req.body.email,
					name: req.body.name,
					password: req.body.password
				}
			}).spread(function(user, created) {
				if (created) {
					req.flash("danger", "Congratultions? You're now a member of Existentialr. Log in and prepare to die.")
					res.redirect("/auth/login");
				} else {
					req.flash("danger", "A user with those credentials already exists. Existentialr does not condone identity theft.");
					res.redirect("/auth/signup");
				}
			}).catch(function(err) {
				req.flash("danger", "An error occured!");
				res.redirect("/auth/signup");
				console.log(req.currentUser);
				console.log(req.session.user);
			});
		}
	});

router.route('/login')
  .get(function(req, res) {
    res.render('auth/login');
  })
  .post(function(req, res) {
    db.user.authenticate(
    	req.body.email, 
    	req.body.password, 
    	function(err, user) {
      if (err) {
        res.send(err);
      }
      else if (user) {
        req.session.user = user.id;
        res.redirect('/main');
      }
      else {
        req.flash('danger', 'Invalid username or password. Please try again.');
        res.redirect('/auth/login');
      }
    });
  });

router.get("/logout", function(req, res) {
	req.flash("danger", "You are now logged out of Existentialr. Come back real soon now.");
	req.session.user = false;
	res.redirect("/");

});



module.exports = router;