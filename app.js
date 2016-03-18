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

testApp.use(express.static('public'));
//testApp.use(express.static('src/views'));
testApp.set('views', './src/views');
testApp.set('view engine', 'jade');

testApp.get('/', function (req, res) {
	res.render('index');
});

testApp.listen(portToListen, function (err) {
	if (err) {
		console.log('failed to listen on port ' + portToListen);
	} else {
		console.log('running on port ' + portToListen);
	}

});