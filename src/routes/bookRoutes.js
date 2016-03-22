var express = require('express');
var bookRouter = express.Router();
var sqlinstance = require('mssql');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var mongoConfig = {
	url: 'mongodb://localhost:27017/testdb'
};

var booksData = [
	{
		bootTitle: 'default',
		bootAuthor: 'default',
		bookLink: 'default'
	}
];

var router = function (navBarItems) {
	//	var booksData = [
	//		{
	//			bookTitle: 'book one',
	//			bookAuthor: 'book one author',
	//			bookLink: '1'
	//		},
	//		{
	//			bookTitle: 'book two',
	//			bookAuthor: 'book two author',
	//			bookLink: '2'
	//		},
	//		{
	//			bookTitle: 'book three',
	//			bookAuthor: 'book three author',
	//			bookLink: '3'
	//		},
	//		{
	//			bookTitle: 'book four',
	//			bookAuthor: 'book four author',
	//			bookLink: '4'
	//		},
	//		{
	//			bookTitle: 'book five',
	//			bookAuthor: 'book five author',
	//			bookLink: '5'
	//		}
	//	];

	//	var request = new sqlinstance.Request();
	//	request.query('select * from books', function (err, records) {
	//
	//		console.log(records);
	//	});
	// 	commented the sql connection as we were not able to use it



	bookRouter
		.route('/')
		.get(function (req, res) {
			mongodb.connect(mongoConfig.url, function (err, db) {
				if (err) {
					console.log('Error establishing mongo connection' + err);
				} else {
					var collection = db.collection('books');
					//console.log('collection status ' + collection);
					collection.find({}, function (err, results) {
						//console.log('record retreival status ' + results !== undefined);

						if (err) {
							console.log('could not retrieve results');
							res.render('bookList', {
								nav: navBarItems,
								books: booksData
							});
						} else {
							results.toArray(function (err, records) {
								if (err) {
									console.log('could not retrieve records');
									res.render('bookList', {
										nav: navBarItems,
										books: booksData
									});
								} else {
									console.log('sending response, entire book collection');
									//res.send('data retreived');
									res.render('bookList', {
										nav: navBarItems,
										books: records
									});
									db.close();
								}
							});
						}
					});

				}
			});
		});

	bookRouter
		.route('/:id')
		.get(function (req, res) {
			mongodb.connect(mongoConfig.url, function (err, db) {
				if (err) {
					console.log('Error establishing mongo connection' + err);
				} else {
					var collection = db.collection('books');
					var bookId = new objectId(req.params.id);
					console.log(bookId);
					collection.findOne({
						_id: bookId
					}, function (err, book) {
						if (err) {
							console.log('book data not returned');
							res.render('bookView', {
								nav: navBarItems,
								book: booksData[0]
							});
						} else {
							if (book == null) {
								console.log('Data received but null');
								res.render('bookView', {
									nav: navBarItems,
									book: booksData[0]
								});
							} else {
								console.log(book);
								res.render('bookView', {
									nav: navBarItems,
									book: book
								});
							}

							//db.close();
						}

					});
				}
			});

		});

	return bookRouter;
};

module.exports = router;