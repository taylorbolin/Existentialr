var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');


router.route('/')
	.get(function(req, res) {
		db.comment.findAll({
			order: 'id DESC'
		}).then(function(comments) {
			res.render('comments/index', {comments: comments})
		});
	})
	.post(function(req, res) {
	db.comment.create({userID: req.currentUser.id, content: req.body.comment})
	.then(function(comment) {
			res.redirect('/comments')
		
	});

});


module.exports = router;