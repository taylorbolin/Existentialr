// var
// 	https = require('https'),
// 	keys = require('../key_config.js'),
// 	lifeOptions = {
// 		hostname: 'life-left.p.mashape.com',
// 		port: 443,
// 		method: 'GET',
// 		headers: {
// 			"X-Mashape-Key": keys.LIFE_KEY,
// 			"Accept": "application/json"
// 		}
// 	};

// var exports = module.exports = {};

// exports.getLife = function(date, gender){
// 		lifeOptions.path = '/time-left?birth=' 
// 			+ date.replace(/\s/g, '\+') 
// 			+ '&' + 'gender=' + gender;
// 		var datachunk = "";
// 		var request = https.request(lifeOptions, function(res){
// 			res.on('data', function(data){
// 				datachunk += data
// 			});
// 			res.on('end', function(){
// 				console.log(datachunk);
// 			})
// 		});
// 		request.end();

// 		request.on('error', function(err){
// 			console.log(err);
// 		})
// 	}
