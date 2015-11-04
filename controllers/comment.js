var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');

// var authorName = req.params.name;
// var commentText = req.body.comment

router.route('/')
	.get(function(req, res) {
		res.render('comments/index', {userID: req.currentUser.name, content: req.body.comment});
		// find all
	})
	.post(function(req, res) {
	db.comment.create({userID: req.currentUser.id, content: req.body.comment})
	.then(function(comment) {
		res.redirect('/comments')
	});

});
// router.get('/', function(req, res) {
// 	res.render('comments/index');
// });

// router.post('/', function(req, res){
// 	// var userID = 
// 	var authorName = req.params.name;
// 	var commentText = req.body.comment
// 	db.comment.create({name: authorName, comment: commentText})
// 	.then(function(comment) {
// 		res.render('comments/index', {name: authorName, comment: commentText})
// 	});

// });

module.exports = router;