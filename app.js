var express = require('express');
var testApp = express();
var sql = require('mssql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var expressSession = require('express-session');


//var message = "hello Brackets";
//
//if (true) {
//    console.log(message);
//} else {
//    console.log("hi");
//}


var portToListen = process.env.PORT || 3000;
var sqlConfig = {
	user: 'books',
	password: 'pluralsight1@',
	server: 'gpnju6fwr2.database.windows.net',
	database: 'Books',
	options: {
		encrypt: true
	}
}

var list = ['a', 'b', 'c', 'd', 'e'];
var navBarItems = [{
	link: "/Books",
	linkText: "Book"
	}, {
	link: "/Authors",
	linkText: "Author"
	},{
	link: "/AddBooks",
	linkText: "Add Books"
}];

testApp.use(express.static('public'));
//testApp.use(express.static('src/views'));
testApp.set('views', './src/views');

//testApp.set('view engine', 'jade');

//var handleBars = require('express-handlebars');
//
//testApp.engine('.hbs', handleBars({
//	extname: '.hbs'
//}));
//
//testApp.set('view engine', '.hbs');

testApp.set('view engine', 'ejs');

//sql.connect(sqlConfig, function (err) {
//	console.log(err);
//});
//not using sql as of now


testApp.use(bodyParser.json()) // support json encoded bodies
testApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
testApp.use(cookieParser());
testApp.use(expressSession({secret: 'library'}));
require('./src/config/passportAuth')(testApp);

var bookRouter = require('./src/routes/bookRoutes')(navBarItems);
testApp.use('/Books', bookRouter);

var addBookRouter = require('./src/routes/addBookRoutes')(navBarItems);
testApp.use('/AddBooks', addBookRouter);

var authenticationRouter = require('./src/routes/authentication')(navBarItems);
testApp.use('/auth', authenticationRouter);

testApp.get('/', function (req, res) {
	res.render('index', {
		nav: navBarItems
	});
});

testApp.listen(portToListen, function (err) {
	if (err) {
		console.log('failed to listen on port ' + portToListen);
	} else {
		console.log('running on port ' + portToListen);
	}

});