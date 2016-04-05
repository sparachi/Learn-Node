var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var mongoConfig = {
	url: 'mongodb://localhost:27017/testdb'
};


module.exports = function (navBarItems) {

	authRouter
		.route('/signup')
		.post(function (req, res) {

			console.log(req.body);

			mongodb.connect(mongoConfig.url, function (err, db) {
				var userCollection = db.collection('repo1Users');
				var userToInsert = {
					username: req.body.userName,
					password: req.body.password
				};

				userCollection.insert(userToInsert, function (err, result) {
					// login function is added by passport to the incoming requestwhen we initialize(), session() etc
					// it tells the passport that the user is logged in or not and ready to go or not
					// when we actually sign in we dont need to explicityly call req.login
					// the purpose to call here is, when the user signs up, we also log the user in
					req.login(result.ops[0], function () {
						res.redirect('/auth/profile');
					})
				});
			});

		})
		.get(function (req, res) {

			res.render('signup', {
				nav: navBarItems
			});

		});

	authRouter
		.route('/profile')
		.all(function (req, res, next) {
			if(!req.user) {
				res.redirect('/');
			}
			next();
		})
		.get(function (req, res) {
			// req.user will tell all about the user that signed in
			res.json(req.user);
		});

	authRouter
		.route('/signin')
		.post(passport.authenticate('local', {
			failureRedirect: '/auth/signin'
		}), function (req, res) {
			res.redirect('/auth/profile');
			//			res.render('signin', {
			//				nav: navBarItems
			//			});
		})
		.get(function (req, res) {

			res.render('signin', {
				nav: navBarItems
			});

		});

	return authRouter;
}