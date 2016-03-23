var express = require('express');
var addBookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
//var bodyParser = require('body-parser');

var mongoConfig = {
	url: 'mongodb://localhost:27017/testdb'
};

var books = [
	{
		bookTitle: 'Life On the Mississippi',
		genre: 'History',
		bookAuthor: 'Mark Twain',
		read: false,
		bookLink: 1
	},
	{
		bookTitle: 'Childhood',
		genre: 'Biography',
		bookAuthor: 'Lev Nikolayevich Tolstory',
		read: false,
		bookLink: 2
	},
	{
		bookTitle: 'Life In America',
		genre: 'History',
		bookAuthor: 'Sai Karthik',
		read: false,
		bookLink: 3
	},
	{
		bookTitle: 'War and Peace',
		genre: 'Historical Fiction',
		bookAuthor: 'Lev Nikolayevich Tolstory',
		read: false,
		bookLink: 4
	},
	{
		bookTitle: 'Les Miserables',
		genre: 'Historical Fiction',
		bookAuthor: 'Victor Hugo',
		read: false,
		bookLink: 5
	},
	{
		bookTitle: 'The Time Machine',
		genre: 'Science Fiction',
		bookAuthor: 'H.G. Wells',
		read: false,
		bookLink: 6
	},
	{
		bookTitle: 'A Journey into the center of the Earth',
		genre: 'Science Fiction',
		bookAuthor: 'Jules Verne',
		read: false,
		bookLink: 7
	},
	{
		bookTitle: 'The Dark Wold',
		genre: 'Fantasy',
		bookAuthor: 'Henry Kuttner',
		read: false,
		bookLink: 8
	}
];

module.exports = function (navItems) {
	addBookRouter
		.route('/')
		.post(function (req, res) {
			console.log('post request to submit data received');

			var toInsert = {
				bootTitle: req.body.bookTitle,
				bookGenre: req.body.bookGenre,
				bookAuthor: req.body.bookAuthor,
				read: false,
				bookLink: ''
			};
			mongodb.connect(mongoConfig.url, function (err, db) {
				if (err) {
					console.log('Error establishing mongo connection' + err);
					res.render('addBooks', {
						nav: navItems,
						status: 'failure'
					});
				} else {
					var collection = db.collection('books');
					collection.insert(toInsert, function (err, results) {
						console.log('record insertion status ' + results);
						res.render('addBooks', {
							nav: navItems,
							status: 'success'
						});
					});
					db.close();
				}
			});


		})
		.get(function (req, res) {
			//			mongodb.connect(mongoConfig.url, function (err, db) {
			//				if (err) {
			//					console.log('Error establishing mongo connection' + err);
			//				} else {
			//					var collection = db.collection('books');
			//					collection.insertMany(books, function (err, results) {
			//						console.log("record insertion status " + results);
			//					});
			//					db.close();
			//				}
			//			});

			res.render('addBooks', {
				nav: navItems,
				status: ''
			});
		});

	return addBookRouter;
};