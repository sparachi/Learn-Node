var express = require('express');

//var message = "hello Brackets";
//
//if (true) {
//    console.log(message);
//} else {
//    console.log("hi");
//}

var testApp = express();
var portToListen = process.env.PORT || 3000;

var list = ['a', 'b', 'c', 'd', 'e'];

testApp.use(express.static('public'));
//testApp.use(express.static('src/views'));
testApp.set('views', './src/views');

//testApp.set('view engine', 'jade');

var handleBars = require('express-handlebars');

testApp.engine('.hbs', handleBars({
	extname: '.hbs'
}));

testApp.set('view engine', '.hbs');

testApp.get('/', function (req, res) {
	res.render('index', {
		list
	});
});

testApp.listen(portToListen, function (err) {
	if (err) {
		console.log('failed to listen on port ' + portToListen);
	} else {
		console.log('running on port ' + portToListen);
	}

});