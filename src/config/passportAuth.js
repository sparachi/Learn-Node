var passport = require('passport');

module.exports = function (app) {
	
	app.use(passport.initialize());
	app.use(passport.session());
	
	// to serialize the user to be stored into session
	passport.serializeUser(function (userObjToPutIntoSession, callbackFunc){
		// err is null for now
		callbackFunc(null, userObjToPutIntoSession);
	});
	
	// to deserialize the user from session
	passport.deserializeUser(function (userObjFromSession, callbackFunc) {
		// err is null now
		callbackFunc(null, userObjFromSession);
	});
	
	require('./strategies/local.strategy')();
};