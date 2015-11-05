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
			req.flash("danger", "Passwords entered do not match. Try again!");
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
					alert("congratulations!")
					// swal({   
	    //     	title: "Congratulations",
	    //     	text: "You're now a member of Existentialr",
	    //     	timer: 2000,   
	    //     	showConfirmButton: false
	    //     });
					res.redirect("/main");
				} else {
					req.flash("danger", "a user with that ID already exists");
					res.redirect("/auth/signup");
				}
			}).catch(function(err) {
				req.flash("danger", "An error occured!");
				res.redirect("/auth/signup");
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
        req.flash('danger', 'Invalid username or password');
        res.redirect('/auth/login');
      }
    });
  });

router.get("/logout", function(req, res) {
	req.flash("danger", "You are logged out");
	req.session.user = false;
	res.redirect("/");

});



module.exports = router;