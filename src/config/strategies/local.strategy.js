var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

var mongoConfig = {
	url: 'mongodb://localhost:27017/testdb'
};

module.exports = function () {
	console.log('in local strategy');
	
	// *************below passport strategy parameters 
	// 'usernameField' & 'passwordField' are case sensitive
	// however you can change these defaults*********
	// values of those parameters i.e. 'userName' & 'password' have to match the form element id's
	passport.use('local',new LocalStrategy({

			usernameField: 'userName',
			passwordField: 'password'

		},
		function (userName, password, callbackFunc) {
			console.log('trying to connect to Mongo from local strategy');
			mongodb.connect(mongoConfig.url, function (err, db) {
				var userCollection = db.collection('repo1Users');
				userCollection.findOne({
						username: userName
					},
					function (err, results) {
						if (err) {
							console.log('user look up failed');
							callbackFunc('unable to find user', null);
						} else {
							console.log(results);
							if (results.password === password) {
								var user = results;
								// err is null now
								callbackFunc(null, user);
							} else {
								console.log('wrong password');
								callbackFunc(null, false, {message: 'wrong password'});
							}

						}
					});

			});
		}));

};